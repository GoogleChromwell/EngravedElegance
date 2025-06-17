<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    require_once "../connection.inc.php";

    $product_id = $_GET['product_id'] ?? null;
    if (!$product_id) {
        http_response_code(400);
        echo json_encode(["error" => "Missing product_id"]);
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM products WHERE product_id = ?");
    $stmt->execute([$product_id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($product);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    try {
        require_once "../connection.inc.php";

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["product_id"])) {
            http_response_code(400);
            echo json_encode(["error" => "Missing user product_id"]);
            exit();
        }

        $query = "UPDATE products 
                  SET product_name = :product_name,
                      product_description = :product_description,
                      price = :price,
                      quantity = :quantity
                  WHERE product_id = :product_id";

        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ":product_name" => $data["product_name"],
            ":product_description" => $data["product_description"],
            ":price" => $data["price"],
            ":quantity" => $data["quantity"],
            ":product_id" => $data["product_id"]
        ]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
