document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('deleteUserModalOverlay');
  const cancelBtn = document.getElementById('cancelDeleteBtn');
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  let userIdToDelete = null;

  function openModal(userId) {
    userIdToDelete = userId;
    modalOverlay.classList.add('show');
  }

  function closeModal() {
    modalOverlay.classList.remove('show');
    userIdToDelete = null;
  }

  cancelBtn.addEventListener('click', closeModal);

  confirmBtn.addEventListener('click', async () => {
    if (!userIdToDelete) return;

    showLoading("Excluindo usuário..."); // Mostra o loading

    try {
      const formData = new FormData();
      formData.append('id', userIdToDelete);

      const response = await fetch('/components/user/delete_user_submit_ajax.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        removeUserFromList(userIdToDelete);
        showToast('Usuário excluído com sucesso!', 'success', 'top-right', 3000);
        loadUsers();
      } else {
        showToast(result.message || 'Erro ao excluir usuário', 'error', 'top-right', 3000);
      }
    } catch (err) {
      showToast('Erro na requisição: ' + err.message, 'error', 'top-right', 3000);
    } finally {
      hideLoading(); // Esconde o loading
      closeModal();
    }
  });

  function removeUserFromList(userId) {
    const userList = document.querySelector('.user-list');
    if (!userList) return;

    const userRow = userList.querySelector(`[data-id="${userId}"]`);
    if (userRow) userRow.remove();

    if (userList.children.length === 0) {
      const noUsersMsg = document.createElement('div');
      noUsersMsg.classList.add('no-users-msg');
      noUsersMsg.textContent = 'Nenhum usuário cadastrado.';
      userList.appendChild(noUsersMsg);
    }
  }

  // Torna essa função global para o botão chamar
  window.deleteUserOpenModal = function (userId) {
    openModal(userId);
  };
});
