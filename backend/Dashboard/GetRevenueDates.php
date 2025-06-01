<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../connection.inc.php";

try {
    $stmt = $pdo->query("SELECT DISTINCT sales_date FROM revenue ORDER BY sales_date DESC");
    $dates = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode(['dates' => $dates]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
