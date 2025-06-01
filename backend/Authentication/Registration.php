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

    if (isset($data["username"], $data["email"], $data["password"], $data['role'])) {
        $role = $data["role"];
        $username = $data["username"];
        $email = $data["email"];
        $password = password_hash($data["password"], PASSWORD_DEFAULT);


        try {
            require_once "../connection.inc.php";

            // Check if email already exists
            $checkQuery = "SELECT * FROM users WHERE email = :email";
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([":email" => $email]);

            if ($checkStmt->rowCount() > 0) {
                http_response_code(409); // Conflict
                echo json_encode(["error" => "Email already in use"]);
                exit();
            }

            // Insert user
            $query = "INSERT INTO users(username, email, password, role) 
                      VALUES (:username, :email, :password, :role)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ":username" => $username,
                ":email" => $email,
                ":password" => $password,
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
