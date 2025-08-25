// === Formulário de Login ===
const loginForm = document.getElementById('loginForm');

loginForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    showLoading("Verificando credenciais...");

    const formData = new FormData(loginForm);

    try {
        const response = await fetch('/components/login/services/login_submit.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status) {
            showToast(result.message || "Login realizado com sucesso!", "success", "top-right", 3000);

            // Redireciona para dashboard ou página inicial
            setTimeout(() => {
                window.location.href = "/dashboard.php";
            }, 1000);
        } else {
            showToast(result.message || "Usuário ou senha inválidos.", "error", "top-right", 4000);
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        showToast("Erro na requisição: " + error.message, "error", "top-right", 4000);
    } finally {
        hideLoading();
    }
});
