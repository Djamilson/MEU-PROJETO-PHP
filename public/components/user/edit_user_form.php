<div id="editUserDrawerOverlay" class="overlay"></div>

<div id="editUserDrawer" class="drawer">
    <form id="editUserForm" class="form">
        <h2 id="formTitle">Edite Usuário</h2>

        <!-- Campo oculto para identificar se é edição -->
        <input type="hidden" name="id" id="userId">
        <input type="hidden" name="debug_token" value="form_user_v3">

        <label>Nome:</label>
        <input type="text" name="name" id="name" required>

        <label>Data de Nascimento:</label>
        <input type="date" name="birth_date" id="birth_date" required>

        <label>Endereço:</label>
        <input type="text" name="address" id="address" required>

        <label>Estado:</label>
        <input type="text" name="state" id="state" required>

        <label>CPF:</label>
        <input type="text" name="cpf" id="cpf">

        <label>Email:</label>
        <input type="email" name="email" id="email">

        <div class="form-actions">
            <button type="submit" class="btn-primary">Salvar</button>
            <button type="button" id="editUserCloseDrawerBtn" class="btn-secondary">Cancelar</button>
        </div>
    </form>
</div>


