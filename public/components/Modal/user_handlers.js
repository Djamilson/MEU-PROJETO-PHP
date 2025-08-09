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
    }
});

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
            loadUsers(); // Recarrega lista após editar
        } else {
            showToast(result.message || "Erro ao atualizar usuário", "error", "top-right", 4000);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showToast("Erro inesperado ao salvar os dados.", "error", "top-right", 4000);
    }
});

// === Função: Criar linha visual do usuário (com botão Editar) ===
function renderUserRow(user) {
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
        <div>${user.created_at || '-'}</div>
        <div>
            <button class="btn-secondary" onclick='editUserOpenDrawerById(${user.id}, ${JSON.stringify(user).replace(/'/g, "&apos;")})'>
                Editar
            </button>
            <button class="btn-secondary" onclick='deleteUserOpenDrawerById(${user.id})'>
                delete
            </button>
        </div>
    `;

    return userRow;
}

// === Função: Adicionar novo usuário à lista ===
function addUserToList(user) {
    let userList = document.querySelector(".user-list");

    if (!userList) {
        userList = document.createElement("div");
        userList.classList.add("user-list");
        document.querySelector(".main-content")?.appendChild(userList);
    }

    document.querySelector(".no-users-msg")?.remove();

    const userRow = renderUserRow(user);
    userList.appendChild(userRow);
}

// === Função: Carregar todos os usuários ===
async function loadUsers() {
    try {
        const response = await fetch('/components/user/list_users_ajax.php');
        const result = await response.json();

        if (result.status === 'success') {
            const userList = document.querySelector(".user-list");
            const noUsersMsg = document.querySelector(".no-users-msg");

            userList.innerHTML = '';
            noUsersMsg?.remove();

            if (result.users.length === 0) {
                if (!document.querySelector(".no-users-msg")) {
                    const msg = document.createElement("p");
                    msg.classList.add("no-users-msg");
                    msg.textContent = "Nenhum usuário encontrado.";
                    document.querySelector(".main-content")?.appendChild(msg);
                }
                return;
            }

            result.users.forEach(user => {
                const userRow = renderUserRow(user);
                userList.appendChild(userRow);
            });

        } else {
            showToast("Erro ao carregar usuários: " + result.message, "error", "top-right", 4000);
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        showToast("Erro ao buscar usuários: " + error.message, "error", "top-right", 4000);
    }
}

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

// === Drawer alternativo (não utilizado no fluxo principal) ===
function openEditDrawer(localUser = null) {
    const drawer = document.getElementById("drawer");
    drawer.classList.remove("hidden");

    if (!localUser) return;

    document.getElementById("editUserId").value = localUser.id;
    document.getElementById("editUserNome").value = localUser.nome;
    document.getElementById("editUserEmail").value = localUser.email;

    fetch(`get_user_by_id_ajax.php?id=${localUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const updatedUser = data.user;
                document.getElementById("editUserNome").value = updatedUser.nome;
                document.getElementById("editUserEmail").value = updatedUser.email;
            } else {
                console.error(data.message);
            }
        })
        .catch(err => console.error("Erro na requisição AJAX:", err));
}

// === Função: Comparar objetos usuário ===
function usersAreDifferent(user1, user2) {
    const keys = ['name', 'birth_date', 'address', 'state', 'cpf', 'email'];
    return keys.some(key => (user1[key] || '') !== (user2[key] || ''));
}

// === Função: Atualizar linha de usuário na DOM ===
function updateUserRow(user) {
    const userList = document.querySelector(".user-list");
    if (!userList) return;

    const rows = userList.querySelectorAll(".user-row");
    rows.forEach(row => {
        if (row.children[0].textContent == user.id) {
            const newRow = renderUserRow(user);
            userList.replaceChild(newRow, row);
        }
    });
}

//==== Delete ====//
const deleteUserModal = document.getElementById("deleteUserModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let userIdToDelete = null;

function deleteUserOpenDrawerById(id) {
    userIdToDelete = id;
    deleteUserModal.style.display = "block";
}

cancelDeleteBtn.addEventListener("click", () => {
    deleteUserModal.style.display = "none";
    userIdToDelete = null;
});

confirmDeleteBtn.addEventListener("click", async () => {
    if (!userIdToDelete) return;

    try {
        const formData = new FormData();
        formData.append("id", userIdToDelete);

        const response = await fetch("/components/user/delete_user_submit_ajax.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.status === "success") {
            removeUserFromList(userIdToDelete)
            showToast("Usuário excluído com sucesso!", "success", "top-right", 3000);
            loadUsers();
        } else {
            showToast(result.message || "Erro ao excluir usuário", "error", "top-right", 3000);
        }
    } catch (err) {
        showToast("Erro na requisição: " + err.message, "error", "top-right", 3000);
    } finally {
        deleteUserModal.style.display = "none";
        userIdToDelete = null;
    }
});


function removeUserFromList(userId) {
    const userList = document.querySelector(".user-list");
    if (!userList) return;

    // Procura a linha do usuário pelo data-id
    const userRow = userList.querySelector(`[data-id="${userId}"]`);
    if (userRow) {
        userRow.remove();
    }

    // Se não houver mais usuários, mostra a mensagem "sem usuários"
    if (userList.children.length === 0) {
        const noUsersMsg = document.createElement("div");
        noUsersMsg.classList.add("no-users-msg");
        noUsersMsg.textContent = "Nenhum usuário cadastrado.";
        userList.appendChild(noUsersMsg);
    }
}

// === Início: Carrega usuários ao abrir a página ===
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});
