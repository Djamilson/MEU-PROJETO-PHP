// Funções globais de loading
function showLoading(message = "Processando...") {
  const overlay = document.getElementById("globalLoadingOverlay");
  if (!overlay) return;

  const msgElement = overlay.querySelector("p");
  if (msgElement) msgElement.textContent = message;

  overlay.classList.add("show");
}

function hideLoading() {
  const overlay = document.getElementById("globalLoadingOverlay");
  if (!overlay) return;

  overlay.classList.remove("show");
}
