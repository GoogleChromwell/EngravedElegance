<?php
// Login.php

session_start();

if (isset($_SERVER['HTTP_ORIGIN']) && preg_match('/^http:\/\/localhost:\d+$/', $_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: https://your-production-domain.com");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (is_null($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON received"]);
    exit();
}

if (empty($data["email"]) || empty($data["password"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$email = $data["email"];
$password = $data["password"];

try {
    require_once "../connection.inc.php";

    $stmt = $pdo->prepare("SELECT email, role, first_name, last_name, password FROM users WHERE BINARY email = :email");
    $stmt->execute([":email" => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        $_SESSION["user"] = [
            "email" => $user["email"],
            "role" => $user["role"],
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"]
        ];

        http_response_code(200);
        echo json_encode([
            "message" => "Login successful",
            "email" => $user["email"],
            "role" => $user["role"],
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
