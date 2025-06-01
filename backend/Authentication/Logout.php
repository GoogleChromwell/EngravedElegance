<?php
session_start();
session_unset();
session_destroy();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

echo json_encode(["message" => "Logged out successfully"]);
