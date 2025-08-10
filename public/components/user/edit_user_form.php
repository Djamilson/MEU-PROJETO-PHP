<div id="editUserDrawerOverlay" class="overlay"></div>

<div id="editUserDrawer" class="drawer">
    <form id="editUserForm" class="form">
        <h2 id="formTitle">Edite Usuário</h2>

        <!-- Campo oculto para identificar se é edição -->
        <input type="hidden" name="id" id="userId">
        <input type="hidden" name="debug_token" value="form_user_v3">

        <label>Nome:</label>
        <input type="text" name="name" id="name" required>

    <div class="custom-calendar no-select" data-lang="pt-BR">
    <label class="label">Data de Nascimento:</label>
    <input type="text" name="birth_date" id="birth_date" class="date-picker-input" placeholder="Selecione a data" autocomplete="off">

    <span class="calendar-icon" role="button" aria-label="Abrir calendário">📅</span>

    <div class="calendar-popup" aria-hidden="true">
      <div class="calendar-header">
        <button type="button" class="prev-month" aria-label="Mês anterior">&lt;</button>
        <select class="calendar-month" aria-label="Selecionar mês"></select>
        <select class="calendar-year" aria-label="Selecionar ano"></select>
        <button type="button" class="next-month" aria-label="Próximo mês">&gt;</button>
      </div>

      <div class="calendar-weekdays"></div>
      <div class="calendar-days"></div>
    </div>
</div>



        <label>Endereço:</label>
        <input type="text" name="address" id="address" required>

        <label>Estado:</label>
        <input type="text" name="state" id="state" required>

        <label>CPF:</label>
        <input type="text" name="cpf" id="cpf">

        <label>Email:</label>
        <input type="email" name="email" id="email">

        <div class="form-actions">
             
        
        <button type="submit" class="btn-success btn-icon-left" title="Salvar">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 12.6111L8.92308 17.5L20 6.5" />
    </svg>
    Salvar
</button>

<button type="button" class="btn-danger btn-icon-left" title="Cancelar" id="editUserCloseDrawerBtn">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
    Cancelar
</button>
        </div>



    </form>
</div>


