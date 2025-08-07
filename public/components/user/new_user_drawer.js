// Elementos do DOM
const drawer = document.getElementById('newUserDrawer');
const overlay = document.getElementById('newUserDrawerOverlay');
const openBtn = document.getElementById('newUserOpenDrawerBtn');
const closeBtn = document.getElementById('newUserCloseDrawerBtn');
const userForm = document.getElementById('newUserForm');

// Abrir Drawer
openBtn?.addEventListener('click', () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
});

// Fechar Drawer
function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    userForm.reset();
}

closeBtn?.addEventListener('click', closeDrawer);

// Envio do formulário via Ajax
userForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(userForm);

    try {
        showToast('Enviando dados...', "info", "top-right", 3000);

        const response = await fetch('/components/user/new_user_submit_ajax.php', {
            method: 'POST',
            body: formData
        });

        // Verifica se a resposta foi ok (HTTP 200-299)
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Resposta do servidor (JSON):", result);

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

// Adiciona novo usuário à lista na página
function addUserToList(user) {
    let userList = document.querySelector(".user-list");

    if (!userList) {
        userList = document.createElement("div");
        userList.classList.add("user-list");
        document.querySelector(".main-content")?.appendChild(userList);
    }

    // Remove mensagem "Nenhum usuário encontrado"
    document.querySelector(".no-users-msg")?.remove();

    // Cria nova linha de usuário
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
        <div>${user.created_at}</div>
    `;

    userList.appendChild(userRow);
}
