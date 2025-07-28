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


    // 🔍 Log dos dados recebidos
    error_log("📦📦 Dados recebidos no createUser(): " . json_encode([
        'data' => $data,
        
    ]));

    if (!$name || !$birth_date || !$email || !$state || !$cpf) {
        return "⚠️ Por favor, preencha todos os campos obrigatórios.";
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, birth_date, address, state, email, cpf) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $birth_date, $address, $state, $email, $cpf]);

        $id = $pdo->lastInsertId();

        // Retorna os dados completos do usuário recém-criado
        $query = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $query->execute([$id]);
        $user = $query->fetch(PDO::FETCH_ASSOC);

        return $user;
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
}