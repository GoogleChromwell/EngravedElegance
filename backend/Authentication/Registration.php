<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
        http_response_code(200);
        exit();
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        $input = file_get_contents("php://input");

        $data =  json_decode($input, true);

        if(isset($data["username"], $data["email"], $data["password"])){
            $username = $data["username"];
            $email = $data["email"];
            $password = $data["password"];

            try {
                require_once "../connection.inc.php";
                
                $query = "
                INSERT INTO users(username, email, password) 
                VALUES (:username, :email, :password);";

                $stmt = $pdo->prepare($query);
                $stmt->execute([
                    ":username" => $username,
                    ":email" => $email,
                    ":password" => $password
                ]);

                echo json_encode(["message" => "User registered successfully"]);

            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Database error: " . $e->getMessage()]);
            }
        }
        else{
            http_response_code(400);
            echo json_encode(["error" => "Invalid input data"]);
        }
    }
    else{
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
    }