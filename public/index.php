<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="assets/globals.css">

    <link rel="stylesheet" href="components/Toasty/toasty.css" />

</head>

<body>
    <div class="menu">
        <h1>Welcome to the PHP Project</h1>
        <a href="user/index.php">Listar Usuários</a>
    </div>

    <!-- Contêiner de teste: nenhum script JS fora da <script>! -->
</body>

<!-- Carregue o JS do toast -->
<script src="components/Toasty/toasty.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        showToast("Usuário cadastrado com sucesso!", "success", "top-right", 4000);
        showToast("Erro ao cadastrar usuário: Erro de validação", "error", "bottom-left", 4000);
    });

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("toast-close")) {
            const toast = e.target.closest(".toast");
            if (toast) {
                toast.remove(); // Remove o toast da tela
            }
        }
    });
</script>
</body>

</html>