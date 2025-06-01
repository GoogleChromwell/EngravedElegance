<?php
session_start(); // Start or resume the session

// Allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:5173"); // Use your React frontend origin
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // Required when using cookies or sessions

// Handle preflight request (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Only allow POST method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Get input data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validate required fields
if (!isset($data["email"]) || !isset($data["password"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$email = $data["email"];
$password = $data["password"];

try {
    require_once "../connection.inc.php";

    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->execute([":email" => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        // ✅ Set session on successful login
        $_SESSION["user"] = [
            "username" => $user["username"],
            "email" => $user["email"]
        ];

        echo json_encode([
            "message" => "Login successful",
            "username" => $user["username"],
            "email" => $user["email"]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
