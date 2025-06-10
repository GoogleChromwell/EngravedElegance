<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200); exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
       require_once "../connection.inc.php";

        $query = "
          SELECT 
            carts.cart_id,
            carts.quantity            AS cart_quantity,      -- alias
            products.product_id,
            products.product_name,
            products.product_description,    
            products.price,
            products.image,
            products.quantity         AS stock_quantity      -- alias
          FROM carts
          JOIN products ON carts.product_id = products.product_id
        ";

        $stmt = $pdo->query($query);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
