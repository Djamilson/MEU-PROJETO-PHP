<?php

// Debug: mostra o caminho atual do script
//echo "Caminho atual: " . __DIR__;
//exit;
error_log("📦 bootstrap.php carregado. Caminho: ✅" . __DIR__); 
// Carrega autoload do Composer
require_once dirname(__DIR__) . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Carrega variáveis do ambiente a partir do .env
$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// Define caminho base do projeto
define('BASE_PATH', dirname(__DIR__));

// Inclui dependências de banco e lógica
require_once BASE_PATH . '/scripts/db.php';
require_once BASE_PATH . '/scripts/user_handler.php';
