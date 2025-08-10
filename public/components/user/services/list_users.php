<?php
// components/user/list_users_ajax.php

require_once(__DIR__ . '/../../../../scripts/user_handler.php');
require_once __DIR__ . '/../../../../util/date_helper.php';

use Scripts\UserHandler;

header('Content-Type: application/json');

try {
    $users = UserHandler::listUsers();

    foreach ($users as &$user) {
        if (!empty($user['birth_date'])) {
            $user['birth_date'] = formatDateToBR($user['birth_date']);
        }

        if (!empty($user['created_at'])) {
            $user['created_at'] = formatDateAndHoursToBR($user['created_at']);
        }
    }
    unset($user); // boa prática ao usar referência (&)

    error_log("📦 Minha lista " . json_encode($users, JSON_UNESCAPED_UNICODE));

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

