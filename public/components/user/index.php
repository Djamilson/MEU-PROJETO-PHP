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
            <button id="newUserOpenDrawerBtn" class="btn-success">Cadastrar Novo Usuário</button>
        </div>

        <div class="user-list" id="userList">
            <!-- Conteúdo será preenchido via JavaScript -->
        </div>
        <p class="no-users-msg" id="noUsersMessage" style="display: none;">Nenhum usuário encontrado.</p>
    </div>


<?php include(__DIR__ . '/new_user_form.php'); ?>
<?php include(__DIR__ . '/edit_user_form.php'); ?>

