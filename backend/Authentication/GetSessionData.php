<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["user"])) {
    echo json_encode([
        "loggedIn" => true,
        "email" => $_SESSION["user"]["email"],
        "role" => $_SESSION["user"]["role"],
        "first_name" => $_SESSION["user"]["first_name"],
        "last_name" => $_SESSION["user"]["last_name"],
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
