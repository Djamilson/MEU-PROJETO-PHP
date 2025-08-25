<?php

namespace Scripts;

require_once __DIR__ . '/db.php'; // Conexão com banco

use App\Database;
use PDO;

class LoginHandler
{
    public static function login(array $data)
    {
        $pdo = Database::connect();

        $login = $data['login'] ?? null;
        $password = $data['password'] ?? null;

        if (!$login || !$password) {
            return "⚠️ Por favor, preencha login e senha.";
        }

        try {
            // Busca usuário pelo login (email ou username)
            $stmt = $pdo->prepare("SELECT * FROM users WHERE login = ? OR email = ? LIMIT 1");
            $stmt->execute([$login, $login]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return "Usuário não encontrado.";
            }

            // Se a senha foi armazenada com hash
            if (!password_verify($password, $user['password'])) {
                return "Senha incorreta.";
            }

            // Login bem-sucedido → retorna os dados do usuário
            // (Opcional: você pode remover campos sensíveis)
            unset($user['password']);

            return [
                "status" => true,
                "message" => "✅ Login realizado com sucesso!",
                "user" => $user
            ];

        } catch (\PDOException $e) {
            return "Erro ao fazer login: " . $e->getMessage();
        }
    }
}
