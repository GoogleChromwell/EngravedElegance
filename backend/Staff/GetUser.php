<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        require_once "../connection.inc.php";

        if (!isset($_GET["id"])) {
            http_response_code(400);
            echo json_encode(["error" => "Missing user ID"]);
            exit();
        }

        $id = $_GET["id"];
        $query = "SELECT id, email, last_name, password, first_name, middle_initial, address, contact_number, monthly_salary, role 
                  FROM users 
                  WHERE id = :id AND role = 'staff'";
        $stmt = $pdo->prepare($query);
        $stmt->execute([":id" => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "User not found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
