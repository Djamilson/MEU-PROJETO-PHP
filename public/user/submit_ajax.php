<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../scripts/user_handler.php';
use Scripts\UserHandler;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $data = [
        'name' => $_POST['name'] ?? null,
        'birth_date' => $_POST['birth_date'] ?? null,
        'address' => $_POST['address'] ?? null,
        'state' => $_POST['state'] ?? null,
        'email' => $_POST['email'] ?? null,
        'cpf' => $_POST['cpf'] ?? null,
    ];

    $result = UserHandler::createUser($data);

    if (is_array($result)) {
        echo json_encode([
            'status' => 'success',
            'user' => $result
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => $result
        ]);
    }
    exit; // <---- MUITO IMPORTANTE
}

