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

  const id = `toast-${type}-${message.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;

  const existingToast = document.getElementById(id);
  if (existingToast) {
    const progress = existingToast.querySelector('.toast-progress');
    progress.style.animation = 'none';
    void progress.offsetWidth;
    progress.style.animation = `toast-progress-animation ${duration}ms linear forwards`;

    clearTimeout(existingToast._removeTimeout);
    existingToast._removeTimeout = setTimeout(() => {
      hideAndRemoveToast(existingToast, container);
    }, duration + 100);
    return;
  }

  const svgs = {
    success: `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4 -4" />
      </svg>
    `,
    error: `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <line x1="12" y1="8" x2="12" y2="13" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="16" r="1.5" fill="white"/>
      </svg>
    `,
    warning: `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 20h20L12 2z" />
        <line x1="12" y1="9" x2="12" y2="13" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="1" fill="white"/>
      </svg>
    `,
    info: `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <line x1="12" y1="8" x2="12" y2="8" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="12" x2="12" y2="16" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  };

  const toast = document.createElement('div');
  toast.id = id;
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    ${svgs[type] || ''}
    <span class="toast-message">${message}</span>
    <button class="toast-close">×</button>
    <div class="toast-progress" style="animation: toast-progress-animation ${duration}ms linear forwards;"></div>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  toast._removeTimeout = setTimeout(() => {
    hideAndRemoveToast(toast, container);
  }, duration + 100);
}

function hideAndRemoveToast(toast, container) {
  toast.classList.remove('show');
  toast.classList.add('hide');
  setTimeout(() => {
    toast.remove();
    if (!container.hasChildNodes()) container.remove();
  }, 400);
}

// Fecha toasts manualmente com transição
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toast-close")) {
    const toast = e.target.closest(".toast");
    if (toast) {
      const container = toast.parentElement;
      hideAndRemoveToast(toast, container);
    }
  }
});
