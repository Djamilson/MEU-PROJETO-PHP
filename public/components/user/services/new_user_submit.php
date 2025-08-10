<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../scripts/user_handler.php';
require_once __DIR__ . '/../../../../util/date_helper.php';

use Scripts\UserHandler;

header('Content-Type: application/json');

error_log("📡 new_user_submit_ajax.php foi acessado via método " . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Método não permitido. Use POST.'
    ]);
    exit;
}

// Recebendo dados
$data = [
    'name'       => $_POST['name'] ?? null,
    'birth_date' => $_POST['birth_date'] ?? null,
    'address'    => $_POST['address'] ?? null,
    'state'      => $_POST['state'] ?? null,
    'email'      => $_POST['email'] ?? null,
    'cpf'        => $_POST['cpf'] ?? null,
];

error_log("📦 Dados recebidos: " . json_encode($data, JSON_UNESCAPED_UNICODE));

// Validação básica
$requiredFields = ['name', 'birth_date', 'address', 'state'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        echo json_encode([
            'status' => 'error',
            'message' => "Campo obrigatório '$field' não preenchido."
        ]);
        exit;
    }
}

// Converte a data antes de salvar no banco
$data['birth_date'] = formatDateToISO($data['birth_date']);

// Criando o usuário
$result = UserHandler::createUser($data);

error_log("📡 Resultado do cadastro: " . json_encode($result, JSON_UNESCAPED_UNICODE));

if (is_array($result)) {
    echo json_encode([
        'status' => 'success',
        'user'   => $result
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => $result
    ]);
}
exit;
