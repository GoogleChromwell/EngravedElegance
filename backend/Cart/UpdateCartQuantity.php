<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    try {
        require_once "../connection.inc.php";

        $data = json_decode(file_get_contents("php://input"), true);

        $cartId = $data['cart_id'] ?? null;
        $newQuantity = $data['quantity'] ?? null;

        if (!$cartId || !$newQuantity) {
            http_response_code(400);
            echo json_encode(["error" => "Missing cart_id or quantity"]);
            exit();
        }

        $query = "UPDATE carts SET quantity = :quantity WHERE cart_id = :cart_id";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ":quantity" => $newQuantity,
            ":cart_id" => $cartId
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
