<div class="user-list">
    <div class="user-header user-row">
            <div>ID</div>
            <div>Nome</div>
            <div>Data de Nascimento</div>
            <div>Endereço</div>
            <div>Estado</div>
            <div>CPF</div>
            <div>Email</div>
            <div>Criado em</div>
        </div>
    <?php if (count($users) > 0): ?>
        <?php foreach ($users as $user): ?>
            <div class="user-row">
                <div><?= htmlspecialchars($user['id']) ?></div>
                <div><?= htmlspecialchars($user['name']) ?></div>
                <div><?= htmlspecialchars($user['birth_date']) ?></div>
                <div><?= htmlspecialchars($user['address']) ?></div>
                <div><?= htmlspecialchars($user['state']) ?></div>
                <div><?= htmlspecialchars($user['cpf']) ?></div>
                <div><?= htmlspecialchars($user['email']) ?></div>
                <div><?= htmlspecialchars($user['created_at']) ?></div>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p class="no-users-msg">Nenhum usuário encontrado.</p>
    <?php endif; ?>
</div>
