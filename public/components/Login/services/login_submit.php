<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../scripts/login_handler.php';

use Scripts\LoginHandler;

header('Content-Type: application/json');

error_log("📡 login_submit.php foi acessado via método " . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => false,
        'message' => 'Método não permitido. Use POST.'
    ]);
    exit;
}

// Recebendo dados do formulário
$data = [
    'login'    => $_POST['login'] ?? null,
    'password' => $_POST['password'] ?? null
];

error_log("📦 Dados recebidos para login: " . json_encode([
    'login' => $data['login'],
    'password' => str_repeat('*', strlen($data['password'] ?? '')) // não logar senha real
], JSON_UNESCAPED_UNICODE));

// Validação básica
if (empty($data['login']) || empty($data['password'])) {
    echo json_encode([
        'status'  => false,
        'message' => 'Por favor, preencha login e senha.'
    ]);
    exit;
}

// Faz login via handler
$result = LoginHandler::login($data);

error_log("📡 Resultado do login: " . json_encode($result, JSON_UNESCAPED_UNICODE));

if (is_array($result) && isset($result['status']) && $result['status'] === true) {
    // Inicia sessão e armazena dados
    session_start();
    $_SESSION['user_id'] = $result['user']['id'] ?? null;
    $_SESSION['user_name'] = $result['user']['name'] ?? null;

    echo json_encode([
        'status'  => true,
        'message' => '✅ Login realizado com sucesso!',
        'redirect' => '/components/Dashboar/index.php',
        'user'    => $result['user']
    ]);
} else {
    echo json_encode([
        'status'  => false,
        'message' => is_string($result) ? $result : ($result['message'] ?? 'Erro ao realizar login.')
    ]);
}
exit;
