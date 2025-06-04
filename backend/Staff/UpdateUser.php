<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    try {
        require_once "../connection.inc.php";

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["id"])) {
            http_response_code(400);
            echo json_encode(["error" => "Missing user ID"]);
            exit();
        }

        $query = "UPDATE users 
                  SET email = :email,
                      password = :password,
                      last_name = :last_name,
                      first_name = :first_name,
                      middle_initial = :middle_initial,
                      address = :address,
                      contact_number = :contact_number,
                      monthly_salary = :monthly_salary,
                      role = :role
                  WHERE id = :id";

        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ":email" => $data["email"],
            ":password" => password_hash($data["password"], PASSWORD_DEFAULT),
            ":last_name" => $data["last_name"],
            ":first_name" => $data["first_name"],
            ":middle_initial" => $data["middle_initial"],
            ":address" => $data["address"],
            ":contact_number" => $data["contact_number"],
            ":monthly_salary" => $data["monthly_salary"],
            ":role" => $data["role"],
            ":id" => $data["id"]
        ]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
