<?php
require_once(__DIR__ . '/../../scripts/user_handler.php');

use Scripts\UserHandler;

$users = UserHandler::listUsers();
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Sistema de Usuários</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <div class="header">
            <h1>Usuários Cadastrados</h1>
            <button id="openDrawerBtn" class="btn-success">Novo Usuário</button>
        </div>

        <div class="main-content">
            <?php include(__DIR__ . '/list_user.php'); ?>
        </div>
    </div>


    <?php include(__DIR__ . '/form_user.php'); ?>

    <script>
        const drawer = document.getElementById('drawer');
        const overlay = document.getElementById('drawerOverlay');
        //const leftOverlay = document.getElementById('drawerLeftOverlay'); // ← Novo overlay
        const openBtn = document.getElementById('openDrawerBtn');
        const closeBtn = document.getElementById('closeDrawerBtn');
        const userForm = document.getElementById('userForm');

        openBtn.addEventListener('click', () => {
            drawer.classList.add('open');
            overlay.classList.add('show');
            // leftOverlay.classList.add('show'); // ← Mostra o overlay esquerdo
        });

        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('show');
            // leftOverlay.classList.remove('show'); // ← Esconde o overlay esquerdo
            userForm.reset();
        }

        closeBtn?.addEventListener('click', closeDrawer);
        //leftOverlay.addEventListener('click', closeDrawer); // ← Fecha ao clicar no overlay esquerdo

        openBtn.addEventListener('click', () => {
            drawer.classList.add('open');
            overlay.classList.add('show');
        });

        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('show');
            userForm.reset();
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeDrawer);
        }
        // Submete o formulário via Ajax
        userForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(userForm);

            try {
                const response = await fetch('submit_ajax.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                console.log("Resposta do servidor:", result);


                if (result.status === 'success') {
                    addUserToList(result.user);
                    closeDrawer();
                    showToast("Usuário cadastrado com sucesso!", "success", "top-right", 4000);
                } else {
                    showToast("Erro ao cadastrar usuário: " + (result.message || "Erro desconhecido."), "error", "top-right", 4000);
                }

            } catch (error) {
                console.error("Erro na requisição:", error);
                showToast("Erro de conexão com o servidor.", "error", "top-right", 4000);
            }
        });

        // Adiciona novo usuário à tabela
        function addUserToList(user) {
            let userList = document.querySelector(".user-list");

            // Se a lista não existir, criamos ela e adicionamos cabeçalhos
            if (!userList) {
                userList = document.createElement("div");
                userList.classList.add("user-list");
                // Insere na página (por ex. dentro de `.main-content`)
                document.querySelector(".main-content").appendChild(userList);
            }

            // Remove mensagem "Nenhum usuário encontrado", se ainda existir
            const emptyMsg = document.querySelector(".no-users-msg");
            if (emptyMsg) emptyMsg.remove();

            // Cria linha do novo usuário
            const userRow = document.createElement("div");
            userRow.classList.add("user-row");
            userRow.innerHTML = `
        <div>${user.id}</div>
        <div>${user.name}</div>
        <div>${user.birth_date}</div>
        <div>${user.address}</div>
        <div>${user.state}</div>
        <div>${user.cpf || '-'}</div>
        <div>${user.email || '-'}</div>
        <div>${user.created_at}</div>
    `;

            userList.appendChild(userRow);
        }
    </script>

</body>

</html>