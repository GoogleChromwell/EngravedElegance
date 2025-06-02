<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $cartID = $data["cart_id"] ?? null;

    if (!$cartID) {
        http_response_code(400);
        echo json_encode(["error" => "Missing cart_id"]);
        exit();
    }

    try {
        require_once "../connection.inc.php";

        $stmt = $pdo->prepare("DELETE FROM carts WHERE cart_id = :cart_id");
        $stmt->execute([":cart_id" => $cartID]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
