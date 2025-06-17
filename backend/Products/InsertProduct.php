<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        require_once "../connection.inc.php";

        $data = json_decode(file_get_contents("php://input"), true);

        if (
            empty($data["product_name"]) ||
            empty($data["product_description"]) ||
            !isset($data["price"]) ||
            !isset($data["quantity"])
        ) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required product fields"]);
            exit();
        }

        $product_name = $data["product_name"];
        $product_description = $data["product_description"];
        $price = $data["price"];
        $quantity = $data["quantity"];

        $checkQuery = "SELECT COUNT(*) FROM products WHERE product_name = :product_name";
        $checkStmt = $pdo->prepare($checkQuery);
        $checkStmt->execute([":product_name" => $product_name]);
        $count = $checkStmt->fetchColumn();

        if ($count > 0) {
            http_response_code(409);
            echo json_encode(["error" => "Product name already exists"]);
            exit();
        }

        $insertQuery = "INSERT INTO products (product_name, product_description, price, quantity)
                        VALUES (:product_name, :product_description, :price, :quantity)";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->execute([
            ":product_name" => $product_name,
            ":product_description" => $product_description,
            ":price" => $price,
            ":quantity" => $quantity
        ]);

        echo json_encode(["message" => "Product added successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
