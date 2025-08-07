<?php
// components/user/list_users_ajax.php

require_once(__DIR__ . '/../../../scripts/user_handler.php');

use Scripts\UserHandler;

header('Content-Type: application/json');

try {
    $users = UserHandler::listUsers();
    echo json_encode([
        'status' => 'success',
        'users' => $users
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao carregar usuários: ' . $e->getMessage()
    ]);
}
