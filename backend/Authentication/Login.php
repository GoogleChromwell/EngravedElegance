<?php
// Login.php

session_start();

// 🔐 Allow cross-origin requests from any localhost port
if (isset($_SERVER['HTTP_ORIGIN']) && preg_match('/^http:\/\/localhost:\d+$/', $_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    // Optional: Set a fallback or production origin
    header("Access-Control-Allow-Origin: https://your-production-domain.com");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// 🛑 Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// 📩 Parse JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (is_null($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON received"]);
    exit();
}

if (!isset($data["email"]) || !isset($data["password"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$email = $data["email"];
$password = $data["password"];

try {
    require_once "../connection.inc.php"; // Adjust path as needed

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute([":email" => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        $_SESSION["user"] = [
            "username" => $user["username"],
            "email" => $user["email"],
            "role" => $user["role"],
        ];

        http_response_code(200);
        echo json_encode([
            "message" => "Login successful",
            "username" => $user["username"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
