<?php
require_once(__DIR__ . '/../../../../scripts/user_handler.php');
require_once __DIR__ . '/../../../../util/date_helper.php';
use Scripts\UserHandler;

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'ID não fornecido'
    ]);
    exit;
}

$user = UserHandler::getUserById($id);

if ($user) {
    // Converte a data de nascimento para o formato brasileiro
    if (!empty($user['birth_date'])) {
        $user['birth_date'] = formatDateToBR($user['birth_date']);
    }

    echo json_encode([
        'status' => 'success',
        'user' => $user
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Usuário não encontrado'
    ]);
}
