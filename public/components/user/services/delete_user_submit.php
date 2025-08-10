
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../scripts/user_handler.php';

use Scripts\UserHandler;

header('Content-Type: application/json');

try {
    // Verifica se o ID foi enviado
    if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
        echo json_encode([
            'status' => 'error',
            'message' => 'ID inválido ou não informado.'
        ]);
        exit;
    }

    $id = (int) $_POST['id'];

    // Chama a função deleteUser() que já retorna JSON
    $resultJson = UserHandler::deleteUser($id);

    // Retorna o mesmo JSON que a função gerou
    echo $resultJson;

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro inesperado: ' . $e->getMessage()
    ]);
}
