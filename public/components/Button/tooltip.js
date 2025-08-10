let tooltipTimeout;
let tooltipEl = document.createElement("div");
tooltipEl.className = "tooltip";
let tooltipArrow = document.createElement("div");
tooltipArrow.className = "tooltip-arrow";
tooltipEl.appendChild(tooltipArrow);
document.body.appendChild(tooltipEl);

function showTooltip(target, text) {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
        tooltipEl.textContent = text;
        tooltipEl.appendChild(tooltipArrow); // garante a seta
        tooltipEl.classList.add("show");

        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        
        let position = "top";
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width - tooltipRect.width) / 2;

        // Verifica espaço disponível e ajusta posição
        if (top < 0) {
            position = "bottom";
            top = rect.bottom + 8;
        }
        if (left < 0) {
            position = "right";
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.right + 8;
        }
        if (left + tooltipRect.width > window.innerWidth) {
            position = "left";
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.left - tooltipRect.width - 8;
        }

        tooltipEl.setAttribute("data-position", position);
        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.left = `${left}px`;
    }, 600); // atraso de 0,6s
}

function hideTooltip() {
    clearTimeout(tooltipTimeout);
    tooltipEl.classList.remove("show");
}

document.addEventListener("mouseover", e => {
    const btn = e.target.closest("button[title]");
    if (btn) {
        showTooltip(btn, btn.getAttribute("title"));
    }
});

document.addEventListener("mouseout", e => {
    if (e.target.closest("button[title]")) {
        hideTooltip();
    }
});
