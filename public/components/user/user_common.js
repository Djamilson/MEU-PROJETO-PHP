// === Função: Criar linha visual do usuário ===
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
            <button class="btn-success" onclick='editUserOpenDrawerById(${user.id}, ${JSON.stringify(user).replace(/'/g, "&apos;")})'>
                Editar
            </button>
            <button class="btn-danger" onclick="deleteUserOpenModal(${user.id})">Excluir</button>
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

        const userList = document.querySelector(".user-list");
        const noUsersMsg = document.querySelector(".no-users-msg");

        userList.innerHTML = '';
        noUsersMsg?.remove();

        if (result.status === 'success') {
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

// === Inicialização ===
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});
