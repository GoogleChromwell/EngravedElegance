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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        $date = $_GET['date'] ?? date('Y-m-d');
        $formattedDate = date('Y-m-d', strtotime($date));

        $calcQuery = "SELECT 
                        SUM(total_price) AS Sales, 
                        COUNT(order_id) AS Orders,
                        SUM(total_price) * 0.30 AS Earnings 
                      FROM orders 
                      WHERE DATE(order_date) = ?";
        $calcStmt = $pdo->prepare($calcQuery);
        $calcStmt->execute([$formattedDate]);
        $result = $calcStmt->fetch(PDO::FETCH_ASSOC);

        $sales = (float)($result['Sales'] ?? 0);
        $orders = (int)($result['Orders'] ?? 0);
        $earnings = (float)($result['Earnings'] ?? 0);

        $dataFromOrders = $sales > 0 || $orders > 0;

        if (!$dataFromOrders) {
            // Fallback to revenue table
            $revStmt = $pdo->prepare("SELECT sales, earnings, orders FROM revenue WHERE sales_date = ?");
            $revStmt->execute([$formattedDate]);
            $revData = $revStmt->fetch(PDO::FETCH_ASSOC);

            if ($revData) {
                $sales = (float)$revData['sales'];
                $orders = (int)$revData['orders'];
                $earnings = (float)$revData['earnings'];
            }
        } else {
            // Only update revenue table if new data came from orders
            $insertStmt = $pdo->prepare("
                INSERT INTO revenue (sales, earnings, orders, sales_date)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    sales = VALUES(sales),
                    earnings = VALUES(earnings),
                    orders = VALUES(orders)
            ");
            $insertStmt->execute([$sales, $earnings, $orders, $formattedDate]);
        }

        echo json_encode([
            'Sales' => $sales,
            'Orders' => $orders,
            'Earnings' => $earnings
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
