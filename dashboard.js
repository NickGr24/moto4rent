const STORAGE_KEY = 'moto4rent_motos';

function getMotos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveMotos(motos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
}

function renderMotoTable() {
    const tbody = document.getElementById('moto-table-body');
    const motos = getMotos();
    tbody.innerHTML = '';
    // Example service data for each motorcycle (in real app, this would be in the object)
    const serviceData = [
        {
            ulei: "12.04.2024",
            anvelope: "01.03.2024",
            frane: "10.05.2024",
            filtruAer: "05.03.2024",
            filtruUlei: "12.04.2024",
            lant: "15.02.2024",
            alte: "OK"
        },
        {
            ulei: "20.03.2024",
            anvelope: "15.02.2024",
            frane: "12.05.2024",
            filtruAer: "10.03.2024",
            filtruUlei: "20.03.2024",
            lant: "10.01.2024",
            alte: "OK"
        },
        {
            ulei: "01.05.2024",
            anvelope: "10.04.2024",
            frane: "20.05.2024",
            filtruAer: "01.04.2024",
            filtruUlei: "01.05.2024",
            lant: "20.03.2024",
            alte: "OK"
        },
        {
            ulei: "10.04.2024",
            anvelope: "15.03.2024",
            frane: "15.05.2024",
            filtruAer: "12.03.2024",
            filtruUlei: "10.04.2024",
            lant: "01.03.2024",
            alte: "OK"
        },
        {
            ulei: "05.04.2024",
            anvelope: "01.02.2024",
            frane: "08.05.2024",
            filtruAer: "15.03.2024",
            filtruUlei: "05.04.2024",
            lant: "10.02.2024",
            alte: "OK"
        },
        {
            ulei: "18.03.2024",
            anvelope: "20.01.2024",
            frane: "12.04.2024",
            filtruAer: "18.02.2024",
            filtruUlei: "18.03.2024",
            lant: "15.01.2024",
            alte: "OK"
        },
        {
            ulei: "22.04.2024",
            anvelope: "10.03.2024",
            frane: "25.05.2024",
            filtruAer: "22.03.2024",
            filtruUlei: "22.04.2024",
            lant: "05.03.2024",
            alte: "OK"
        },
        {
            ulei: "02.05.2024",
            anvelope: "15.04.2024",
            frane: "28.05.2024",
            filtruAer: "02.04.2024",
            filtruUlei: "02.05.2024",
            lant: "18.03.2024",
            alte: "OK"
        },
        {
            ulei: "15.04.2024",
            anvelope: "05.03.2024",
            frane: "18.05.2024",
            filtruAer: "15.03.2024",
            filtruUlei: "15.04.2024",
            lant: "01.03.2024",
            alte: "OK"
        },
        {
            ulei: "25.03.2024",
            anvelope: "20.02.2024",
            frane: "10.04.2024",
            filtruAer: "25.02.2024",
            filtruUlei: "25.03.2024",
            lant: "10.02.2024",
            alte: "OK"
        },
        {
            ulei: "08.04.2024",
            anvelope: "01.03.2024",
            frane: "15.05.2024",
            filtruAer: "08.03.2024",
            filtruUlei: "08.04.2024",
            lant: "15.02.2024",
            alte: "OK"
        },
        {
            ulei: "30.04.2024",
            anvelope: "20.03.2024",
            frane: "22.05.2024",
            filtruAer: "30.03.2024",
            filtruUlei: "30.04.2024",
            lant: "20.03.2024",
            alte: "OK"
        },
        {
            ulei: "12.04.2024",
            anvelope: "10.03.2024",
            frane: "18.05.2024",
            filtruAer: "12.03.2024",
            filtruUlei: "12.04.2024",
            lant: "10.03.2024",
            alte: "OK"
        },
        {
            ulei: "05.05.2024",
            anvelope: "15.04.2024",
            frane: "25.05.2024",
            filtruAer: "05.04.2024",
            filtruUlei: "05.05.2024",
            lant: "15.04.2024",
            alte: "OK"
        },
        {
            ulei: "18.04.2024",
            anvelope: "05.03.2024",
            frane: "10.05.2024",
            filtruAer: "18.03.2024",
            filtruUlei: "18.04.2024",
            lant: "05.03.2024",
            alte: "OK"
        }
    ];
    motos.forEach((moto, idx) => {
        const tr = document.createElement('tr');
        tr.style.opacity = 0;
        tr.innerHTML = `
            <td><img src="${moto.image}" alt="${moto.name}"></td>
            <td>${moto.name}</td>
            <td>
                <span class="moto-info-icon" title="Informații service: când a fost schimbat uleiul, anvelopele etc.">
                    <i class="fa-solid fa-circle-info"></i>
                </span>
            </td>
            <td>${moto.price} €</td>
            <td>${moto.category}</td>
            <td>${moto.views}</td>
            <td>
                <button class="edit" data-idx="${idx}">Editează</button>
                <button class="delete" data-idx="${idx}">Șterge</button>
            </td>
        `;
        tbody.appendChild(tr);
        setTimeout(() => { tr.style.transition = 'opacity 0.5s'; tr.style.opacity = 1; }, 60 * idx);
    });

    // Info icon click: show modal with info
    tbody.querySelectorAll('.moto-info-icon').forEach((icon, idx) => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            showMotoInfoModal(motos[idx], serviceData[idx] || {});
        });
    });
}

// Modal logic
function showMotoInfoModal(moto, service) {
    const modal = document.getElementById('moto-info-modal');
    const title = document.getElementById('moto-info-modal-title');
    const body = document.getElementById('moto-info-modal-body');
    body.innerHTML = `
        <ul id="modal-info-list">
            <li><strong>Ulei schimbat:</strong> ${service.ulei || '-'}</li>
            <li><strong>Anvelope schimbate:</strong> ${service.anvelope || '-'}</li>
            <li><strong>Frâne verificate:</strong> ${service.frane || '-'}</li>
            <li><strong>Filtru de aer:</strong> ${service.filtruAer || '-'}</li>
            <li><strong>Filtru de ulei:</strong> ${service.filtruUlei || '-'}</li>
            <li><strong>Lanț:</strong> ${service.lant || '-'}</li>
            <li><strong>Alte consumabile:</strong> ${service.alte || '-'}</li>
        </ul>
    `;
    title.textContent = `Informații service pentru ${moto.name}`;
    modal.style.display = 'flex';

    // Ensure close handlers are set only once
    if (!modal.dataset.closeHandlersSet) {
        document.getElementById('moto-info-modal-close').onclick = function() {
            modal.style.display = 'none';
        };
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        modal.dataset.closeHandlersSet = "1";
    }
}

function renderChart() {
    const motos = getMotos();
    const ctx = document.getElementById('moto-stats-chart').getContext('2d');
    if (window.motoChart) window.motoChart.destroy();
    window.motoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: motos.map(m => m.name),
            datasets: [{
                label: 'Vizualizări',
                data: motos.map(m => m.views),
                backgroundColor: [
                    '#ff6600', '#ff8833', '#ffd580', '#ffae7a', '#ffb366', '#ff7f50'
                ]
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 900,
                easing: 'easeOutBounce'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#ff6600',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function resetForm() {
    document.getElementById('add-moto-form').reset();
    document.getElementById('add-moto-form').removeAttribute('data-edit-idx');
    document.querySelector('#add-moto-form button[type="submit"]').textContent = 'Adaugă motocicletă';
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('moto-name').value.trim();
    const price = parseInt(document.getElementById('moto-price').value, 10);
    const category = document.getElementById('moto-category').value.trim();
    let motos = getMotos();

    const editIdx = document.getElementById('add-moto-form').getAttribute('data-edit-idx');
    if (editIdx !== null && editIdx !== undefined && editIdx !== '') {
        // Edit mode
        motos[editIdx] = { ...motos[editIdx], name, price, category };
    } else {
        // Add mode, use a default image or empty string
        motos.push({ name, price, category, image: 'default-moto.png', views: Math.floor(Math.random() * 100) + 1 });
    }
    saveMotos(motos);
    renderMotoTable();
    renderChart();
    resetForm();
}

function handleTableClick(e) {
    if (e.target.classList.contains('edit')) {
        const idx = e.target.getAttribute('data-idx');
        const motos = getMotos();
        const moto = motos[idx];
        document.getElementById('moto-name').value = moto.name;
        document.getElementById('moto-price').value = moto.price;
        document.getElementById('moto-category').value = moto.category;
        document.getElementById('add-moto-form').setAttribute('data-edit-idx', idx);
        document.querySelector('#add-moto-form button[type="submit"]').textContent = 'Salvează modificările';
    }
    if (e.target.classList.contains('delete')) {
        const idx = e.target.getAttribute('data-idx');
        let motos = getMotos();
        if (confirm('Sigur doriți să ștergeți această motocicletă?')) {
            motos.splice(idx, 1);
            saveMotos(motos);
            renderMotoTable();
            renderChart();
            resetForm();
        }
    }
}

document.getElementById('add-moto-form').addEventListener('submit', handleFormSubmit);
document.getElementById('moto-table-body').addEventListener('click', handleTableClick);

// Demo data if empty
if (getMotos().length === 0) {
    saveMotos([
        { name: 'BMW R1250GS', price: 63, category: 'sport', image: 'bmw-r1250gs.png', views: 120 },
        { name: 'BMW R1250 RT', price: 70, category: 'sport', image: 'bmw-r1250rt.png', views: 105 },
        { name: 'BMW F750 GS', price: 65, category: 'sport', image: 'bmw-f750gs.png', views: 95 },
        { name: 'HONDA NC 750X', price: 57, category: 'turism', image: 'honda-nc750x.png', views: 80 },
        { name: 'BMW NAKED', price: 67, category: 'naked', image: 'bmw-naked.png', views: 60 },
        { name: 'Yamaha MT-07', price: 55, category: 'naked', image: 'yamaha-mt07.png', views: 78 },
        { name: 'Honda CB500X', price: 52, category: 'aventura', image: 'honda-cb500x.png', views: 69 },
        { name: 'Suzuki V-Strom 650', price: 59, category: 'aventura', image: 'suzuki-vstrom650.png', views: 73 },
        { name: 'Kawasaki Z900', price: 62, category: 'naked', image: 'kawasaki-z900.png', views: 88 },
        { name: 'Ducati Multistrada 950', price: 75, category: 'turism', image: 'ducati-multistrada950.png', views: 54 },
        { name: 'Triumph Tiger 900', price: 68, category: 'aventura', image: 'triumph-tiger900.png', views: 61 },
        { name: 'KTM 790 Adventure', price: 66, category: 'aventura', image: 'ktm-790adv.png', views: 57 },
        { name: 'Yamaha Tracer 900', price: 64, category: 'turism', image: 'yamaha-tracer900.png', views: 49 },
        { name: 'Honda Africa Twin', price: 77, category: 'aventura', image: 'honda-africatwin.png', views: 92 },
        { name: 'Suzuki GSX-S750', price: 58, category: 'sport', image: 'suzuki-gsx-s750.png', views: 44 }
    ]);
}

renderMotoTable();
renderChart();
