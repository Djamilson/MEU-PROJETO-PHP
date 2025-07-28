

<div id="drawerOverlay" class="overlay"></div>

<div id="drawer" class="drawer">
    <form id="userForm" class="form">
        <h2>Novo Usuário</h2>
        
        <input type="hidden" name="debug_token" value="form_user_v3">

        <label>Nome:</label>
        <input type="text" name="name" required>

        <label>Data de Nascimento:</label>
        <input type="date" name="birth_date" required>

        <label>Endereço:</label>
        <input type="text" name="address" required>

        <label>Estado:</label>
        <input type="text" name="state" required>

        <label>CPF:</label>
        <input type="text" name="cpf">

        <label>Email:</label>
        <input type="email" name="email">

        <div class="form-actions">
            <button type="submit" class="btn-primary">Salvar</button>
            <button type="button" id="closeDrawerBtn" class="btn-secondary">Cancelar</button>
        </div>
    </form>
</div>
