// === Função: Criar cabeçalho das colunas ===
function renderUserHeader() {
    const header = document.createElement("div");
    header.classList.add("user-row", "user-header");
    header.innerHTML = `
        <div>ID</div>
        <div>Nome</div>
        <div>Data Nasc.</div>
        <div>Endereço</div>
        <div>Estado</div>
        <div>CPF</div>
        <div>Email</div>
        <div>Criado em</div>
        <div>Ações</div>
    `;
    return header;
}

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
            <button class="btn-success" title="Editar"
                onclick='editUserOpenDrawerById(${user.id}, ${JSON.stringify(user).replace(/'/g, "&apos;")})'>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/>
                    <polygon points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"/>
                </svg>
            </button>
            <button class="btn-danger" title="Excluir" onclick="deleteUserOpenModal(${user.id})">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"
                    fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
            </button>
        </div>
    `;

    return userRow;
}

// === Função: Carregar todos os usuários ===
async function loadUsers() {
    try {
        const response = await fetch('/components/user/list_users_ajax.php');
        const result = await response.json();

        let userList = document.querySelector(".user-list");
        if (!userList) {
            userList = document.createElement("div");
            userList.classList.add("user-list");
            document.querySelector(".main-content")?.appendChild(userList);
        }

        // Limpa tudo e recria o cabeçalho
        userList.innerHTML = '';
        userList.appendChild(renderUserHeader());

        document.querySelector(".no-users-msg")?.remove();

        if (result.status === 'success') {
            if (result.users.length === 0) {
                const msg = document.createElement("p");
                msg.classList.add("no-users-msg");
                msg.textContent = "Nenhum usuário encontrado.";
                document.querySelector(".main-content")?.appendChild(msg);
                return;
            }

            result.users.forEach(user => {
                userList.appendChild(renderUserRow(user));
            });
        } else {
            showToast("Erro ao carregar usuários: " + result.message, "error", "top-right", 4000);
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        showToast("Erro ao buscar usuários: " + error.message, "error", "top-right", 4000);
    }
}

// === Função: Adicionar novo usuário à lista ===

function addUserToList(user) {
    let userList = document.querySelector(".user-list");

    if (!userList) {
        userList = document.createElement("div");
        userList.classList.add("user-list");
        document.querySelector(".main-content")?.appendChild(userList);
        userList.appendChild(renderUserHeader()); // adiciona o cabeçalho se for o primeiro
    } else if (!userList.querySelector(".user-header")) {
        userList.appendChild(renderUserHeader());
    }

    document.querySelector(".no-users-msg")?.remove();

    const newRow = renderUserRow(user);

    // Insere logo após o cabeçalho
    const header = userList.querySelector(".user-header");
    if (header.nextSibling) {
        userList.insertBefore(newRow, header.nextSibling);
    } else {
        userList.appendChild(newRow);
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

    const rows = userList.querySelectorAll(".user-row:not(.user-header)");
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
