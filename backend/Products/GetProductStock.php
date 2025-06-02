<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["product_id"])) {
    require_once "../connection.inc.php";
    $product_id = $_GET["product_id"];

    $stmt = $pdo->prepare("
        SELECT 
            p.quantity AS stock_quantity,
            IFNULL(c.total_in_cart, 0) AS cart_quantity,
            (p.quantity - IFNULL(c.total_in_cart, 0)) AS available_quantity
        FROM products p
        LEFT JOIN (
            SELECT product_id, SUM(quantity) AS total_in_cart
            FROM carts
            WHERE product_id = :product_id
            GROUP BY product_id
        ) c ON p.product_id = c.product_id
        WHERE p.product_id = :product_id
    ");
    $stmt->execute([':product_id' => $product_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Product not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}
