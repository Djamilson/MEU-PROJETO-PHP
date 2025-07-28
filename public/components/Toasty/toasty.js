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

  const svgs = {
    success: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    warning: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M12 9v2m0 4h.01M4.93 19h14.14c1.08 0 1.63-1.23 1.03-2.1L13.03 4.9a1.25 1.25 0 00-2.06 0L3.9 16.9c-.6.87-.05 2.1 1.03 2.1z"/></svg>`,
    info: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    ${svgs[type] || ''}
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (!container.hasChildNodes()) container.remove();
  }, duration + 100);
}
