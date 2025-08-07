// === Drawer: Editar Usuário ===
const editUserDrawer = document.getElementById("editUserDrawer");
const editUserOverlay = document.getElementById("editUserDrawerOverlay");
const editUserCloseBtn = document.getElementById("editUserCloseDrawerBtn");
const editUserForm = document.getElementById("editUserForm");

function editUserOpenDrawer(user) {
    editUserDrawer.classList.add("open");
    editUserOverlay.classList.add("show");

    // Preencher os campos corretamente
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

editUserForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(editUserForm);

    try {
        const response = await fetch('/components/user/edit_user_submit_ajax.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            showToast("✅ Usuário atualizado com sucesso!", "success", "top-right", 4000);
            editUserCloseDrawer();
            // Recarregar a lista ou atualizar a UI:
            // loadUsers(); 
        } else {
            showToast(result.message || "Erro ao atualizar usuário", "error", "top-right", 4000);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showToast("❌ Erro inesperado ao salvar os dados.", "error", "top-right", 4000);
    }
});
