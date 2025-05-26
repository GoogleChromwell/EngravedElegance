<?php

$contents = file_get_contents('php://input');

try {
    $data = json_decode($contents,
                        flags: JSON_THROW_ON_ERROR | JSON_OBJECT_AS_ARRAY);   
} catch (JsonException $e) {
    exit($e->getMessage());
}

var_dump($data[0]['author']['lastName'], $data[1]['author']['lastName']);

echo '<pre>';
print_r($data);
echo '</pre>';