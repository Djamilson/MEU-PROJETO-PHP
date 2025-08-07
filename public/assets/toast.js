function showToast(message, type = 'success', position = 'top-right', duration = 3000) {
  let container = document.querySelector(`.toast-container[data-position="${position}"]`);

  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.dataset.position = position;

    const positions = {
      'top-right': { top: '10px', right: '10px' },
      'top-left': { top: '10px', left: '10px' },
      'bottom-right': { bottom: '10px', right: '10px' },
      'bottom-left': { bottom: '10px', left: '10px' },
      'top-center': { top: '10px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '10px', left: '50%', transform: 'translateX(-50%)' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };

    Object.assign(container.style, positions[position]);
    container.style.position = 'fixed';
    container.style.zIndex = 9999;

    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (!container.hasChildNodes()) container.remove();
  }, duration);
}

window.showToast = showToast;
