<?php

namespace Scripts;

require_once __DIR__ . '/db.php'; // ← Caminho corrigido, mesmo diretório

use App\Database;
use PDO;

class UserHandler
{
    public static function createUser(array $data)
    {
        $pdo = Database::connect();

        $name = $data['name'] ?? null;
        $birth_date = $data['birth_date'] ?? null;
        $address = $data['address'] ?? null;
        $email = $data['email'] ?? null;
        $state = $data['state'] ?? null;
        $cpf = $data['cpf'] ?? null;

        error_log("📦📦 Dados recebidos no createUser(): " . json_encode(['data' => $data]));

        if (!$name || !$birth_date || !$email || !$state || !$cpf) {
            return "⚠️ Por favor, preencha todos os campos obrigatórios.";
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO users (name, birth_date, address, state, email, cpf) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $birth_date, $address, $state, $email, $cpf]);

            $id = $pdo->lastInsertId();

            $query = $pdo->prepare("SELECT * FROM users WHERE id = ?");
            $query->execute([$id]);
            return $query->fetch(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return "❌ Erro ao cadastrar: " . $e->getMessage();
        }
    }

    public static function listUsers(): array
    {
        $pdo = Database::connect();

        try {
            $stmt = $pdo->query("SELECT * FROM users ORDER BY id DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            die("Erro ao buscar usuários: " . $e->getMessage());
        }
    }

    public static function getUserById(int $id): array|string
    {
        $pdo = Database::connect();

        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user ?: "⚠️ Usuário não encontrado.";
        } catch (\PDOException $e) {
            return "Erro ao buscar usuário: " . $e->getMessage();
        }
    }

    public static function editUser(int $id, array $data): string
    {
        $pdo = Database::connect();

        $name = $data['name'] ?? null;
        $birth_date = $data['birth_date'] ?? null;
        $address = $data['address'] ?? null;
        $email = $data['email'] ?? null;
        $state = $data['state'] ?? null;
        $cpf = $data['cpf'] ?? null;

        if (!$name || !$birth_date || !$email || !$state || !$cpf) {
            return "⚠️ Por favor, preencha todos os campos obrigatórios.";
        }

        try {
            $stmt = $pdo->prepare("UPDATE users SET name = ?, birth_date = ?, address = ?, state = ?, email = ?, cpf = ? WHERE id = ?");
            $stmt->execute([$name, $birth_date, $address, $state, $email, $cpf, $id]);

            return "✅ Usuário atualizado com sucesso.";
        } catch (\PDOException $e) {
            return "Erro ao atualizar: " . $e->getMessage();
        }
    }

public static function deleteUser(int $id): string
{
    $pdo = Database::connect();

    header('Content-Type: application/json'); // Resposta sempre em JSON

    try {
        $myUser = self::getUserById($id);

        if (is_string($myUser)) {
            return json_encode([
                'status' => 'error',
                'message' => "Usuário não encontrado."
            ]);
        }

        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            return json_encode([
                'status' => 'success',
                'message' => "Usuário excluído com sucesso.",
                'id' => $id
            ]);
        } else {
            return json_encode([
                'status' => 'error',
                'message' => "Nenhuma linha afetada. O usuário pode já ter sido removido."
            ]);
        }
    } catch (\PDOException $e) {
        return json_encode([
            'status' => 'error',
            'message' => "Erro ao excluir usuário: " . $e->getMessage()
        ]);
    }
}



}
