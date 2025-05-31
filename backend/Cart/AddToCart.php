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

    $data =  json_decode($input, true);

    if (isset($data["product_id"], $data["quantity"])) {
        $productID = $data["product_id"];
        $quantity = $data["quantity"];


        try {
            require_once "../connection.inc.php";

            $query = "
                INSERT INTO carts(product_id, quantity) 
                VALUES (:product_id, :quantity);";

            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ":product_id" => $productID,
                ":quantity" => $quantity,
            ]);

            echo json_encode(["message" => "User registered successfully"]);
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





// $query = "
        // SELECT 
        //     carts.cart_id, 
        //     products.product_id, 
        //     products.quantity AS product_quantity
        // FROM carts
        // JOIN products ON carts.product_id = products.product_id
        // ";