// ===== MYBRAWLERS.JS — Custom Brawler Library =====

const RARITY_COLORS = {
    'Common': '#b0b0b0',
    'Rare': '#5dbd3a',
    'Super Rare': '#3d8de8',
    'Epic': '#9b44cc',
    'Mythic': '#e63c50',
    'Legendary': '#f5a623'
};

let currentCustomDetailId = null;

function loadMyBrawlers() {
    const grid = document.getElementById('my-brawlers-grid');
    const emptyText = document.getElementById('my-brawlers-empty');
    if (!grid) return;

    const brawlers = loadCustomBrawlers();
    grid.innerHTML = '';

    if (brawlers.length === 0) {
        emptyText.style.display = 'block';
        return;
    }
    emptyText.style.display = 'none';

    brawlers.forEach(brawler => {
        const card = document.createElement('div');
        card.className = 'my-brawler-card';
        const rarityColor = RARITY_COLORS[brawler.rarity] || RARITY_COLORS['Common'];
        card.style.borderColor = rarityColor;
        card.addEventListener('click', () => showCustomBrawlerDetail(brawler.id));

        const img = document.createElement('img');
        img.className = 'my-brawler-img';
        img.src = brawler.imageUrl || '';
        img.alt = brawler.name;
        img.loading = 'lazy';
        card.appendChild(img);

        const name = document.createElement('div');
        name.className = 'my-brawler-name';
        name.textContent = brawler.name;
        card.appendChild(name);

        const rarity = document.createElement('div');
        rarity.className = 'my-brawler-rarity';
        rarity.textContent = brawler.rarity || 'Common';
        rarity.style.color = rarityColor;
        card.appendChild(rarity);

        grid.appendChild(card);
    });
}

function showCustomBrawlerDetail(id) {
    const brawler = loadCustomBrawlers().find(b => b.id === id);
    if (!brawler) return;
    currentCustomDetailId = id;

    const detailImg = document.getElementById('detail-brawler-img');
    detailImg.src = brawler.imageUrl || '';
    detailImg.alt = brawler.name;

    document.getElementById('detail-brawler-name').textContent = brawler.name;

    const rarityColor = RARITY_COLORS[brawler.rarity] || RARITY_COLORS['Common'];
    let html = `<p class="detail-rarity" style="color:${rarityColor};font-weight:800;">${brawler.rarity || 'Common'}</p>`;

    if (brawler.description) {
        html += `<p class="detail-description">${brawler.description}</p>`;
    }

    const abilities = [
        { icon: '&#9876;', label: 'Attack', name: brawler.attackName, desc: brawler.attackDesc },
        { icon: '&#9733;', label: 'Super', name: brawler.superName, desc: brawler.superDesc },
        { icon: '&#9881;', label: 'Gadget', name: brawler.gadgetName, desc: brawler.gadgetDesc },
        { icon: '&#10029;', label: 'Star Power', name: brawler.spName, desc: brawler.spDesc },
        { icon: '&#9889;', label: 'Hypercharge', name: brawler.hyperName, desc: brawler.hyperDesc }
    ];

    abilities.forEach(a => {
        if (a.name) {
            html += `<div class="detail-ability">`;
            html += `<div class="detail-ability-header"><span class="detail-ability-icon">${a.icon}</span> <strong>${a.label}:</strong> ${a.name}</div>`;
            if (a.desc) html += `<div class="detail-ability-desc">${a.desc}</div>`;
            html += `</div>`;
        }
    });

    document.getElementById('detail-brawler-info').innerHTML = html;

    document.getElementById('detail-delete-btn').onclick = () => {
        deleteCustomBrawler(currentCustomDetailId);
        closeCustomBrawlerDetail();
        loadMyBrawlers();
    };

    document.getElementById('custom-brawler-modal').classList.remove('hidden');
}

function closeCustomBrawlerDetail() {
    document.getElementById('custom-brawler-modal').classList.add('hidden');
}
