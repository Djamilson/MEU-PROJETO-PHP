<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../scripts/user_handler.php';
require_once __DIR__ . '/../../../../util/date_helper.php'; // função formatDateToISO
use Scripts\UserHandler;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = $_POST['id'] ?? null;

    if (!$id || !is_numeric($id)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'ID do usuário inválido ou não fornecido.'
        ]);
        exit;
    }

    // Converte a data antes de salvar
    $birthDate = $_POST['birth_date'] ?? null;
    if (!empty($birthDate)) {
        $birthDate = formatDateToISO($birthDate); // converte para YYYY-MM-DD
    }

    $data = [
        'name'       => $_POST['name'] ?? null,
        'birth_date' => $birthDate,
        'address'    => $_POST['address'] ?? null,
        'state'      => $_POST['state'] ?? null,
        'email'      => $_POST['email'] ?? null,
        'cpf'        => $_POST['cpf'] ?? null,
    ];

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

    exit;
}
