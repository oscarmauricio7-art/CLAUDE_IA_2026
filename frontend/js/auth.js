async function login(username, password) {
    const response = await fetch(API_HOST + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password }),
    });

    if (!response.ok) throw new Error('Credenciales incorrectas');

    const data = await response.json();
    if (!data.token) throw new Error('Token no proporcionado');

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify({
        Username: data.Username,
        Trazabilidad: data.Trazabilidad,
        TipoUsuario: data.TipoUsuario,
        RUT: data.RUT,
        NOMBRE: data.NOMBRE
    }));

    window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('authToken')) {
        window.location.href = 'dashboard.html';
        return;
    }

    const btn = document.getElementById('loginBtn');
    const errorEl = document.getElementById('loginError');

    async function handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!username || !password) return;

        btn.disabled = true;
        btn.textContent = 'Ingresando...';
        errorEl.style.display = 'none';

        try {
            await login(username, password);
        } catch (e) {
            errorEl.textContent = e.message;
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Iniciar sesión';
        }
    }

    btn.addEventListener('click', handleLogin);
    document.getElementById('password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});
