<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="/assets/globals.css">
    <link rel="stylesheet" href="/components/Toasty/toasty.css">
    <link rel="stylesheet" href="/components/user/style.css">
    <link rel="stylesheet" href="/components/menu/menu-left/menu-left.css">
    <link rel="stylesheet" href="/components/header/header-styles.css">
</head>

<body>

    <aside class="">
        <?php include(__DIR__ . '/components/header/index.php'); ?>
    </aside>

    <div class="layout">
        <aside class="sidebar">
            <?php include(__DIR__ . '/components/menu/menu-left/index.php'); ?>
        </aside>

        <main class="main-content">
            <div class="menu">

                <a href="/components/user/index.php">Listar Usuários</a>
            </div>

            <?php include(__DIR__ . '/components/user/index.php'); ?>

        </main>
    </div>

</body>

<!-- Carregue o JS do toast -->
<script src="/components/Toasty/toasty.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        showToast("Usuário cadastrado com sucesuuso!", "success", "top-right", 4000);
         showToast("Usuário cadastrado com sucessooo!", "warning", "top-right", 4000);
          showToast("Usuário cadastrado com sucessooo!", "info", "top-right", 4000);
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

<script src="/components/user/new_user_drawer.js"></script>
<script src="/components/user/edit_user_drawer.js"></script>

</body>

</html>