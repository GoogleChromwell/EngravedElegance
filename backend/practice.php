<?php

$accounts = array(
    "navalcromwell@gmail.com" => "123",
    "cromwell@gmail.com" => "123",
    "lucianocromwell@gmail.com" => "456",
    "sachiblack@gmail.com" => "blackcatto",
    "jay@gmail.com" => "password123",
);


echo "Registered Accounts:" . "<br>";

$accountNumber = 0;
$users = count($accounts);

foreach ($accounts as $email => $password) {
    $accountNumber++;
    echo "Account " . $accountNumber . "<br>";
    echo "Email: " . $email . "<br>" .
        "Password: " . $password . "<br>" .
        "<br>";
}

echo "Registered Users: " . $users;
