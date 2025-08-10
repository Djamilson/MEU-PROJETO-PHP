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

// Configuração de paginação
let currentPage = 1;
const usersPerPage = 5;

// === Função: Renderizar paginação ===
function renderPagination(totalPages) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    // Botão Previous
    const prev = document.createElement("a");
    prev.textContent = "Previous";
    prev.href = "#";
    if (currentPage === 1) prev.classList.add("disabled");
    prev.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) loadUsers(currentPage - 1);
    };
    pagination.appendChild(prev);

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("a");
        pageBtn.textContent = i;
        pageBtn.href = "#";
        if (i === currentPage) pageBtn.classList.add("active");
        pageBtn.onclick = (e) => {
            e.preventDefault();
            loadUsers(i);
        };
        pagination.appendChild(pageBtn);
    }

    // Botão Next
    const next = document.createElement("a");
    next.textContent = "Next";
    next.href = "#";
    if (currentPage === totalPages) next.classList.add("disabled");
    next.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) loadUsers(currentPage + 1);
    };
    pagination.appendChild(next);
}

// === Função: Carregar usuários ===
async function loadUsers(page = 1) {
    try {
        const response = await fetch(`/components/user/services/list_users.php?page=${page}&limit=${usersPerPage}`);
        const result = await response.json();

        if (result.status === 'success') {
            currentPage = result.page;

            const userList = document.querySelector(".user-list");
            userList.innerHTML = "";
            userList.appendChild(renderUserHeader());

            result.users.forEach(user => {
                userList.appendChild(renderUserRow(user));
            });

            renderPagination(result.total_pages);
        } else {
            showToast("Erro ao carregar usuários: " + result.message, "error");
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

// Iniciar carregamento
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});
