<?php

$dsn = "mysql:host=localhost:3307;dbname=engravedelegance";
$dbUsername = "root";
$dbPassword = "";

try {
    $pdo = new PDO($dsn, $dbUsername, $dbPassword);
    $pdo-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}
