<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "../connection.inc.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        $customer_name = $data['customer_name'];

        $cartQuery = "
            SELECT 
                c.cart_id,
                c.product_id,
                c.quantity AS cart_quantity,
                p.product_name,
                p.price,
                p.quantity AS product_stock
            FROM carts AS c
            JOIN products AS p ON c.product_id = p.product_id;
        ";
        $cartItems = $pdo->query($cartQuery)->fetchAll(PDO::FETCH_ASSOC);

        if (count($cartItems) === 0) {
            http_response_code(400);
            echo json_encode(["error" => "Cart is empty"]);
            exit();
        }

        $insufficientStockItems = [];

        foreach ($cartItems as $item) {
            if ($item['cart_quantity'] > $item['product_stock']) {
                $insufficientStockItems[] = [
                    "product_id" => $item['product_id'],
                    "product_name" => $item['product_name'],
                    "available" => $item['product_stock'],
                    "requested" => $item['cart_quantity']
                ];
            }
        }

        if (count($insufficientStockItems) > 0) {
            http_response_code(400);
            echo json_encode([
                "error" => "Insufficient stock for some products",
                "details" => $insufficientStockItems
            ]);
            exit();
        }

        $total_price = 0;
        foreach ($cartItems as $item) {
            $total_price += $item['cart_quantity'] * $item['price'];
        }

        $orderStmt = $pdo->prepare("INSERT INTO orders (customer_name, total_price) VALUES (?, ?)");
        $orderStmt->execute([$customer_name, $total_price]);
        $order_id = $pdo->lastInsertId();

        $orderItemStmt = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
            VALUES (?, ?, ?, ?, ?)
        ");

        $updateStockStmt = $pdo->prepare("
            UPDATE products SET quantity = quantity - ? WHERE product_id = ?
        ");

        foreach ($cartItems as $item) {
            $orderItemStmt->execute([
                $order_id,
                $item['product_id'],
                $item['product_name'],
                $item['cart_quantity'],
                $item['price']
            ]);

            $updateStockStmt->execute([
                $item['cart_quantity'],
                $item['product_id']
            ]);
        }

        $pdo->exec("DELETE FROM carts");

        echo json_encode(["message" => "Order placed successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
