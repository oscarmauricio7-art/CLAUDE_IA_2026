let allFletes = [];

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;

    const user = getUser();
    if (user) {
        document.getElementById('userName').textContent = user.NOMBRE || user.Username;
        document.getElementById('userRole').textContent = user.TipoUsuario || '';
        const initials = (user.NOMBRE || 'U').split(' ').map(w => w[0]).join('').slice(0, 2);
        document.getElementById('userAvatar').textContent = initials;
    }

    const now = new Date();
    document.getElementById('topbarDate').textContent =
        `Semana ${getWeekNumber()} — ` + now.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    loadDashboard();
});

async function loadDashboard() {
    const [fletes, vehiculos, clientes, personal] = await Promise.all([
        apiFetch('fletes'),
        apiFetch('vehiculos'),
        apiFetch('clientes'),
        apiFetch('personal'),
    ]);

    if (!fletes) return;

    allFletes = fletes;
    const week = getWeekNumber();
    const weekFletes = fletes.filter(f => f.SEMANA_FLETE === week);
    const totalVentas = weekFletes.reduce((s, f) => s + (f.FACTURA_VALOR_TOTAL || 0), 0);
    const ticket = weekFletes.length > 0 ? totalVentas / weekFletes.length : 0;

    document.getElementById('kpiFletes').textContent = weekFletes.length;
    document.getElementById('kpiVentas').textContent = formatCLP(totalVentas);
    document.getElementById('kpiVehiculos').textContent = vehiculos ? vehiculos.length : '—';
    document.getElementById('kpiClientes').textContent = clientes ? clientes.length : '—';
    document.getElementById('kpiTicket').textContent = formatCLP(ticket);
    document.getElementById('kpiPersonal').textContent = personal ? personal.length : '—';

    renderFletesChart(weekFletes);
    renderVentasChart(weekFletes);
    renderFletesTable(fletes.slice(0, 20));
}

function renderFletesChart(weekFletes) {
    const chart = echarts.init(document.getElementById('chartFletes'));
    const days = {};

    weekFletes.forEach(f => {
        const d = new Date(f.FECHA_CITACION);
        const key = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric' });
        if (!days[key]) days[key] = { IMP: 0, EXP: 0, OTROS: 0 };
        if (f.TIPO_FLETE === 'IMP') days[key].IMP++;
        else if (f.TIPO_FLETE === 'EXP') days[key].EXP++;
        else days[key].OTROS++;
    });

    const labels = Object.keys(days);
    chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, textStyle: { fontSize: 11 } },
        grid: { top: 20, right: 20, bottom: 40, left: 40 },
        xAxis: { type: 'category', data: labels, axisLabel: { fontSize: 11 } },
        yAxis: { type: 'value', minInterval: 1 },
        series: [
            { name: 'IMP', type: 'bar', stack: 'total', data: labels.map(l => days[l].IMP), itemStyle: { color: '#0071e3' }, barWidth: 24, borderRadius: [4, 4, 0, 0] },
            { name: 'EXP', type: 'bar', stack: 'total', data: labels.map(l => days[l].EXP), itemStyle: { color: '#30d158' } },
            { name: 'Otros', type: 'bar', stack: 'total', data: labels.map(l => days[l].OTROS), itemStyle: { color: '#ff9f0a' } },
        ],
    });
    window.addEventListener('resize', () => chart.resize());
}

function renderVentasChart(weekFletes) {
    const chart = echarts.init(document.getElementById('chartVentas'));
    const days = {};

    weekFletes.forEach(f => {
        const d = new Date(f.FECHA_CITACION);
        const key = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric' });
        days[key] = (days[key] || 0) + (f.FACTURA_VALOR_TOTAL || 0);
    });

    const labels = Object.keys(days);
    let cumulative = 0;
    const cumulativeData = labels.map(l => { cumulative += days[l]; return cumulative; });

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                return params.map(p => `${p.seriesName}: ${formatCLP(p.value)}`).join('<br>');
            }
        },
        legend: { bottom: 0, textStyle: { fontSize: 11 } },
        grid: { top: 20, right: 20, bottom: 40, left: 60 },
        xAxis: { type: 'category', data: labels, axisLabel: { fontSize: 11 } },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 10,
                formatter: (v) => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000) + 'K' : v
            }
        },
        series: [
            {
                name: 'Venta diaria',
                type: 'bar',
                data: labels.map(l => days[l]),
                itemStyle: { color: '#0071e3', borderRadius: [4, 4, 0, 0] },
                barWidth: 24,
            },
            {
                name: 'Acumulado',
                type: 'line',
                data: cumulativeData,
                smooth: true,
                lineStyle: { color: '#30d158', width: 2 },
                itemStyle: { color: '#30d158' },
                symbol: 'circle',
                symbolSize: 6,
            }
        ],
    });
    window.addEventListener('resize', () => chart.resize());
}

function renderFletesTable(fletes) {
    const tbody = document.getElementById('fletesTableBody');
    if (!fletes.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-secondary)">Sin fletes</td></tr>';
        return;
    }

    tbody.innerHTML = fletes.map(f => `
        <tr>
            <td style="font-weight:600;font-family:var(--font-mono);font-size:12px">${f.NUMERO_FLETE}</td>
            <td>${formatDate(f.FECHA_CITACION)}</td>
            <td><span class="badge ${f.TIPO_FLETE === 'IMP' ? 'badge-blue' : f.TIPO_FLETE === 'EXP' ? 'badge-green' : 'badge-gray'}">${f.TIPO_FLETE}</span></td>
            <td>${f.CLIENTE || '-'}</td>
            <td style="font-family:var(--font-mono);font-size:12px">${f.NUMERO_CONTENEDOR || '-'}</td>
            <td>${f.CONDUCTOR || '-'}</td>
            <td style="font-weight:500">${formatCLP(f.FACTURA_VALOR_TOTAL)}</td>
            <td>${getStatusBadge(f.ESTATUS)}</td>
        </tr>
    `).join('');
}

function filterFletes() {
    const q = document.getElementById('searchFletes').value.toLowerCase();
    const filtered = allFletes.filter(f =>
        (f.NUMERO_FLETE + '').includes(q) ||
        (f.CLIENTE || '').toLowerCase().includes(q) ||
        (f.CONDUCTOR || '').toLowerCase().includes(q) ||
        (f.NUMERO_CONTENEDOR || '').toLowerCase().includes(q)
    );
    renderFletesTable(filtered.slice(0, 30));
}

function toggleSubmenu(id) {
    const el = document.getElementById(id);
    el.classList.toggle('open');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function goTo(page) {
    window.location.href = `https://fletes.todocontenedor.cl/frontend/${page}.html`;
}
