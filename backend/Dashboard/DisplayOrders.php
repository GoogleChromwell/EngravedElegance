<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        require_once "../connection.inc.php";

        $query = "
            SELECT 
                o.order_id, o.customer_name, o.total_price, o.order_date,
                oi.product_name, oi.quantity
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            ORDER BY o.order_date DESC
        ";

        $stmt = $pdo->query($query);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $orders = [];
        foreach ($results as $row) {
            $orderId = $row['order_id'];
            if (!isset($orders[$orderId])) {
                $orders[$orderId] = [
                    "order_id" => $row['order_id'],
                    "customer_name" => $row['customer_name'],
                    "total_price" => $row['total_price'],
                    "order_date" => $row['order_date'],
                    "items" => []
                ];
            }

            $orders[$orderId]["items"][] = [
                "product_name" => $row['product_name'],
                "quantity" => $row['quantity']
            ];
        }

        echo json_encode(array_values($orders));

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
