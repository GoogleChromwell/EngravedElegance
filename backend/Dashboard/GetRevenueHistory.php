<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../connection.inc.php";

try {
    $stmt = $pdo->query("SELECT sales_date, earnings, sales, orders FROM revenue ORDER BY sales_date ASC");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = array_map(function ($row) {
        return [
            'name' => date('M d', strtotime($row['sales_date'])),
            'earnings' => (float)$row['earnings'],
            'sales' => (float)$row['sales'],
            'orders' => (int)$row['orders']
        ];
    }, $rows);

    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
