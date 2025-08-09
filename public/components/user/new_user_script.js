// === Drawer: Novo Usuário ===
const drawer = document.getElementById('newUserDrawer');
const overlay = document.getElementById('newUserDrawerOverlay');
const openBtn = document.getElementById('newUserOpenDrawerBtn');
const closeBtn = document.getElementById('newUserCloseDrawerBtn');
const userForm = document.getElementById('newUserForm');

openBtn?.addEventListener('click', () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
});

function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    userForm.reset();
}

closeBtn?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

// === Envio do formulário de novo usuário ===
userForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    showLoading("Salvando usuário...");

    const formData = new FormData(userForm);

    try {
        const response = await fetch('/components/user/new_user_submit_ajax.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            addUserToList(result.user);
            closeDrawer();
            showToast("Usuário cadastrado com sucesso!", "success", "top-right", 4000);
        } else {
            showToast("Erro ao cadastrar usuário: " + (result.message || "Erro desconhecido."), "error", "top-right", 4000);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        showToast("Erro na requisição: " + error.message, "error", "top-right", 4000);
    } finally {
        hideLoading();
    }
});
