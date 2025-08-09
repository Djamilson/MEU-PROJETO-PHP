function openModal(title, message, actionFunction) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalMessage').innerText = message;

  // Mostra o modal
  document.getElementById('modalOverlay').style.display = 'flex';

  // Se for passada uma função para o botão de ação
  if (typeof actionFunction === "function") {
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    confirmBtn.onclick = actionFunction;
  }
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // Abrir modal ao clicar no botão
  document.getElementById('openModalBtn').addEventListener('click', () => {
    openModal(
      'Excluir Usuário',
      'Tem certeza que deseja excluir este usuário?',
      () => alert('Usuário excluído!')
    );
  });

  // Fechar modal ao clicar no botão cancelar
  document.getElementById('cancelDeleteBtn').addEventListener('click', closeModal);
});
