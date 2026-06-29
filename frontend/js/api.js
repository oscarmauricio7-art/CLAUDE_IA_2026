function getToken() {
    return localStorage.getItem('authToken');
}

function getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function requireAuth() {
    if (!getToken()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

async function apiFetch(endpoint, options = {}) {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(API_HOST + endpoint, config);

    if (response.status === 401 || response.status === 403) {
        logout();
        return null;
    }

    return response.json();
}

function formatCLP(num) {
    if (!num && num !== 0) return '$0';
    return '$' + Math.round(num).toLocaleString('es-CL');
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CL') + ' ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

function getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

function getStatusBadge(status) {
    const map = {
        'TERMINADO': 'badge-green',
        'EN RUTA': 'badge-blue',
        'PLANIFICADO': 'badge-orange',
        'CANCELADO': 'badge-red',
        'DISPONIBLE': 'badge-green',
        'EN MANTENCION': 'badge-orange',
        'FUERA DE SERVICIO': 'badge-red',
    };
    const cls = map[status] || 'badge-gray';
    return `<span class="badge ${cls}">${status}</span>`;
}
