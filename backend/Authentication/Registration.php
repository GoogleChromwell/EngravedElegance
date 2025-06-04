<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (isset($data["email"], $data["password"], $data['last_name'], $data['first_name'], $data['middle_initial'], $data['address'], $data['contact_number'], $data['monthly_salary'], $data['role'], )) {
        $email = $data["email"];
        $password = password_hash($data["password"], PASSWORD_DEFAULT);
        $lastName = $data["last_name"];
        $firstName = $data["first_name"];
        $middleInitial = $data["middle_initial"];
        $address = $data["address"];
        $contactNumber = $data["contact_number"];
        $monthlySalary = $data["monthly_salary"];
        $role = $data["role"];


        try {
            require_once "../connection.inc.php";
            $checkQuery = "SELECT * FROM users WHERE email = :email";
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([":email" => $email]);

            if ($checkStmt->rowCount() > 0) {
                http_response_code(409); 
                echo json_encode(["error" => "Email already in use"]);
                exit();
            }

            $query = "INSERT INTO users(email, password, last_name, first_name, middle_initial, address, contact_number, monthly_salary, role) 
                      VALUES (:email, :password, :last_name, :first_name, :middle_initial, :address, :contact_number, :monthly_salary, :role)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ":email" => $email,
                ":password" => $password,
                ":last_name" => $lastName,
                ":first_name" => $firstName,
                ":middle_initial" => $middleInitial,
                ":address" => $address,
                ":contact_number" => $contactNumber,
                ":monthly_salary" => $monthlySalary,
                ":role" => $role,
            ]);
            echo json_encode(["message" => "User registered successfully"]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
