<?php
require_once(__DIR__ . '/../../../scripts/user_handler.php');
#require_once BASE_PATH . '/scripts/user_handler.php';


$file = __DIR__ . '/../../../scripts/user_handler.php';

if (!file_exists($file)) {
    echo "Arquivo não encontrado: $file";
    exit;
}

require_once $file;

use Scripts\UserHandler;

$users = UserHandler::listUsers();
?>

<div class="container">
    <div class="header">
    
    <h1>Usuários Cadastrados</h1>
        <button id="newUserOpenDrawerBtn" class="btn-success">Novo Usuário</button>
    </div>
    <?php include(__DIR__ . '/list_user.php'); ?>

</div>

<?php include(__DIR__ . '/new_user_form.php'); ?>

