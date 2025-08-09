// === Drawer: Editar Usuário ===
const editUserDrawer = document.getElementById("editUserDrawer");
const editUserOverlay = document.getElementById("editUserDrawerOverlay");
const editUserCloseBtn = document.getElementById("editUserCloseDrawerBtn");
const editUserForm = document.getElementById("editUserForm");

function editUserOpenDrawer(user) {
    editUserDrawer.classList.add("open");
    editUserOverlay.classList.add("show");

    document.getElementById("userId").value = user.id || '';
    document.getElementById("name").value = user.name || '';
    document.getElementById("birth_date").value = user.birth_date || '';
    document.getElementById("address").value = user.address || '';
    document.getElementById("state").value = user.state || '';
    document.getElementById("cpf").value = user.cpf || '';
    document.getElementById("email").value = user.email || '';
}

function editUserCloseDrawer() {
    editUserDrawer.classList.remove("open");
    editUserOverlay.classList.remove("show");
    editUserForm.reset();
}

editUserCloseBtn?.addEventListener("click", editUserCloseDrawer);
editUserOverlay?.addEventListener("click", editUserCloseDrawer);

// === Envio do formulário de edição ===
editUserForm?.addEventListener("submit", async function (e) {
    e.preventDefault();

    showLoading("Carregando ...");
    const formData = new FormData(editUserForm);

    try {
        const response = await fetch('/components/user/edit_user_submit_ajax.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            showToast("Usuário atualizado com sucesso!", "success", "top-right", 4000);
            editUserCloseDrawer();
            loadUsers();
        } else {
            showToast(result.message || "Erro ao atualizar usuário", "error", "top-right", 4000);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showToast("Erro inesperado ao salvar os dados.", "error", "top-right", 4000);
    } finally {
        hideLoading();
    }
});

// === Abrir drawer de edição e atualizar se necessário ===
async function editUserOpenDrawerById(id, localUser = null) {
    editUserDrawer.classList.add("open");
    editUserOverlay.classList.add("show");

    if (localUser) {
        document.getElementById("userId").value = localUser.id || '';
        document.getElementById("name").value = localUser.name || '';
        document.getElementById("birth_date").value = localUser.birth_date || '';
        document.getElementById("address").value = localUser.address || '';
        document.getElementById("state").value = localUser.state || '';
        document.getElementById("cpf").value = localUser.cpf || '';
        document.getElementById("email").value = localUser.email || '';
    }

    try {
        const response = await fetch(`/components/user/get_user_by_id_ajax.php?id=${id}`);
        const result = await response.json();

        if (result.status === 'success') {
            const user = result.user;

            if (localUser && usersAreDifferent(localUser, user)) {
                updateUserRow(user);
            }

            document.getElementById("userId").value = user.id || '';
            document.getElementById("name").value = user.name || '';
            document.getElementById("birth_date").value = user.birth_date || '';
            document.getElementById("address").value = user.address || '';
            document.getElementById("state").value = user.state || '';
            document.getElementById("cpf").value = user.cpf || '';
            document.getElementById("email").value = user.email || '';

        } else {
            showToast(result.message || "Usuário não encontrado", "error", "top-right", 4000);
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        showToast("Erro ao buscar usuário: " + error.message, "error", "top-right", 4000);
    }
}
