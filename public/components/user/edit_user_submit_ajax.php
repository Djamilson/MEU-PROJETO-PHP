<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../scripts/user_handler.php';
use Scripts\UserHandler;

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    // Captura o ID do usuário a ser editado
    $id = $_POST['id'] ?? null;

    // Verifica se o ID foi enviado
    if (!$id || !is_numeric($id)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'ID do usuário inválido ou não fornecido.'
        ]);
        exit;
    }

    // Dados do formulário
    $data = [
        'name'       => $_POST['name'] ?? null,
        'birth_date' => $_POST['birth_date'] ?? null,
        'address'    => $_POST['address'] ?? null,
        'state'      => $_POST['state'] ?? null,
        'email'      => $_POST['email'] ?? null,
        'cpf'        => $_POST['cpf'] ?? null,
    ];

    // Chamada da função de edição
    $result = UserHandler::editUser((int)$id, $data);

    if (str_starts_with($result, '✅')) {
        echo json_encode([
            'status' => 'success',
            'message' => $result
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => $result
        ]);
    }

    exit; // Encerra o script após o JSON
}
