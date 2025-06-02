<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (isset($data["product_id"], $data["quantity"])) {
        $productID = $data["product_id"];
        $quantity = $data["quantity"];

        try {
            require_once "../connection.inc.php";
            $checkQuery = "SELECT quantity FROM carts WHERE product_id = :product_id";
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':product_id' => $productID]);
            $existingItem = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if ($existingItem) {
                $newQuantity = $existingItem['quantity'] + $quantity;
                $updateQuery = "UPDATE carts SET quantity = :quantity WHERE product_id = :product_id";
                $updateStmt = $pdo->prepare($updateQuery);
                $updateStmt->execute([
                    ':quantity' => $newQuantity,
                    ':product_id' => $productID,
                ]);
                echo json_encode(["message" => "Cart updated with new quantity"]);
            } else {
                $insertQuery = "INSERT INTO carts (product_id, quantity) VALUES (:product_id, :quantity)";
                $insertStmt = $pdo->prepare($insertQuery);
                $insertStmt->execute([
                    ':product_id' => $productID,
                    ':quantity' => $quantity,
                ]);
                echo json_encode(["message" => "Product added to cart"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
