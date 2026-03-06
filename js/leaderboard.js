// ===== LEADERBOARD.JS — Brawl Stars Leaderboard =====

let lbLoaded = false;
let lbBrawlers = [];
let lbAutoRefreshTimer = null;
let lbLastUpdate = null;
let lbCurrentTab = 'players';
let lbCurrentCountry = 'global';

const LB_COUNTRIES = [
    { code: 'global', name: 'Global' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'US', name: 'USA' },
    { code: 'DE', name: 'Germany' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'BR', name: 'Brazil' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'TR', name: 'Turkey' },
    { code: 'MX', name: 'Mexico' },
    { code: 'PL', name: 'Poland' },
    { code: 'RU', name: 'Russia' },
];

const LB_CACHE_KEY = 'bh_lb_cache';
const LB_CACHE_DURATION = 60 * 60 * 1000; // 1 timme

// ===== CACHE =====
function getLbCache(key) {
    try {
        const cache = JSON.parse(localStorage.getItem(LB_CACHE_KEY) || '{}');
        const entry = cache[key];
        if (entry && Date.now() - entry.time < LB_CACHE_DURATION) {
            return entry.data;
        }
    } catch {}
    return null;
}

function setLbCache(key, data) {
    try {
        const cache = JSON.parse(localStorage.getItem(LB_CACHE_KEY) || '{}');
        cache[key] = { data, time: Date.now() };
        localStorage.setItem(LB_CACHE_KEY, JSON.stringify(cache));
    } catch {}
}

// ===== INIT =====
async function loadLeaderboard() {
    if (!lbLoaded) {
        // Ladda brawler-lista for brawler-ranking tab
        try {
            const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
            lbBrawlers = (data.list || data).sort((a, b) => a.name.localeCompare(b.name));
        } catch {}

        // Setup tab-clicks
        document.querySelectorAll('.lb-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                lbCurrentTab = tab.dataset.tab;
                document.getElementById('lb-brawler-picker').classList.toggle('hidden', lbCurrentTab !== 'brawlers');
                fetchLeaderboard();
            });
        });

        // Setup country selector
        const countrySelect = document.getElementById('lb-country');
        countrySelect.addEventListener('change', () => {
            lbCurrentCountry = countrySelect.value;
            fetchLeaderboard();
        });

        // Setup brawler selector
        const brawlerSelect = document.getElementById('lb-brawler-select');
        brawlerSelect.innerHTML = '<option value="">-- Choose brawler --</option>';
        lbBrawlers.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.name;
            brawlerSelect.appendChild(opt);
        });
        brawlerSelect.addEventListener('change', () => {
            if (brawlerSelect.value) fetchLeaderboard();
        });

        lbLoaded = true;
    }

    fetchLeaderboard();
    startAutoRefresh();
}

// ===== AUTO REFRESH =====
function startAutoRefresh() {
    if (lbAutoRefreshTimer) clearInterval(lbAutoRefreshTimer);
    lbAutoRefreshTimer = setInterval(() => {
        // Rensa cache och hämta på nytt
        try { localStorage.removeItem(LB_CACHE_KEY); } catch {}
        fetchLeaderboard();
    }, LB_CACHE_DURATION);
}

function updateTimestamp() {
    const el = document.getElementById('lb-last-update');
    if (el) {
        const now = new Date();
        el.textContent = `Last updated: ${now.toLocaleTimeString('en-US')} — Updates automatically every hour`;
    }
}

// ===== FETCH =====
async function fetchLeaderboard() {
    const container = document.getElementById('lb-content');
    container.innerHTML = '<div class="loader"></div>';

    try {
        if (lbCurrentTab === 'players') {
            await fetchPlayerRankings(container);
        } else if (lbCurrentTab === 'clubs') {
            await fetchClubRankings(container);
        } else if (lbCurrentTab === 'brawlers') {
            await fetchBrawlerRankings(container);
        } else if (lbCurrentTab === 'prestige') {
            await fetchPrestigeRankings(container);
        }
        updateTimestamp();
    } catch (err) {
        console.error('Leaderboard error:', err);
        container.innerHTML = `
            <div class="lb-error">
                <h4>Could not load leaderboard</h4>
                <p>Make sure <code>node server.js</code> is running with API key.</p>
                <p class="lb-error-detail">${err.message || ''}</p>
            </div>
        `;
    }
}

// ===== PLAYER RANKINGS =====
async function fetchPlayerRankings(container) {
    const cacheKey = `players_${lbCurrentCountry}`;
    let data = getLbCache(cacheKey);

    if (!data) {
        const res = await fetch(`/api/rankings/players?country=${lbCurrentCountry}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        data = await res.json();
        if (data.error) throw new Error(data.error);
        setLbCache(cacheKey, data);
    }

    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = '<p class="lb-empty">No players found.</p>';
        return;
    }

    container.innerHTML = `
        <table class="lb-table">
            <thead>
                <tr>
                    <th class="lb-rank">#</th>
                    <th class="lb-name">Player</th>
                    <th class="lb-club">Club</th>
                    <th class="lb-trophies">Trophies</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((p, i) => `
                    <tr class="${i < 3 ? 'lb-top-' + (i + 1) : ''}">
                        <td class="lb-rank">${getRankBadge(p.rank || i + 1)}</td>
                        <td class="lb-name">
                            <span class="lb-player-name">${escapeHtml(p.name)}</span>
                            <span class="lb-tag">${p.tag || ''}</span>
                        </td>
                        <td class="lb-club">${p.club?.name ? escapeHtml(p.club.name) : '<span class="lb-no-club">—</span>'}</td>
                        <td class="lb-trophies">${(p.trophies || 0).toLocaleString('en-US')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== CLUB RANKINGS =====
async function fetchClubRankings(container) {
    const cacheKey = `clubs_${lbCurrentCountry}`;
    let data = getLbCache(cacheKey);

    if (!data) {
        const res = await fetch(`/api/rankings/clubs?country=${lbCurrentCountry}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        data = await res.json();
        if (data.error) throw new Error(data.error);
        setLbCache(cacheKey, data);
    }

    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = '<p class="lb-empty">No clubs found.</p>';
        return;
    }

    container.innerHTML = `
        <table class="lb-table">
            <thead>
                <tr>
                    <th class="lb-rank">#</th>
                    <th class="lb-name">Club</th>
                    <th class="lb-members">Members</th>
                    <th class="lb-trophies">Trophies</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((c, i) => `
                    <tr class="${i < 3 ? 'lb-top-' + (i + 1) : ''}">
                        <td class="lb-rank">${getRankBadge(c.rank || i + 1)}</td>
                        <td class="lb-name">
                            <span class="lb-club-name">${escapeHtml(c.name)}</span>
                            <span class="lb-tag">${c.tag || ''}</span>
                        </td>
                        <td class="lb-members">${c.memberCount || '?'}/30</td>
                        <td class="lb-trophies">${(c.trophies || 0).toLocaleString('en-US')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== BRAWLER RANKINGS =====
async function fetchBrawlerRankings(container) {
    const brawlerId = document.getElementById('lb-brawler-select').value;
    if (!brawlerId) {
        container.innerHTML = '<p class="lb-empty">Choose a brawler above to see the ranking.</p>';
        return;
    }

    const cacheKey = `brawler_${brawlerId}_${lbCurrentCountry}`;
    let data = getLbCache(cacheKey);

    if (!data) {
        const res = await fetch(`/api/rankings/brawlers?brawlerId=${brawlerId}&country=${lbCurrentCountry}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        data = await res.json();
        if (data.error) throw new Error(data.error);
        setLbCache(cacheKey, data);
    }

    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = '<p class="lb-empty">No players found for this brawler.</p>';
        return;
    }

    const brawler = lbBrawlers.find(b => String(b.id) === String(brawlerId));
    const brawlerName = brawler ? brawler.name : 'Brawler';

    container.innerHTML = `
        <table class="lb-table">
            <thead>
                <tr>
                    <th class="lb-rank">#</th>
                    <th class="lb-name">Player</th>
                    <th class="lb-club">Club</th>
                    <th class="lb-trophies">${escapeHtml(brawlerName)} Trophies</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((p, i) => `
                    <tr class="${i < 3 ? 'lb-top-' + (i + 1) : ''}">
                        <td class="lb-rank">${getRankBadge(p.rank || i + 1)}</td>
                        <td class="lb-name">
                            <span class="lb-player-name">${escapeHtml(p.name)}</span>
                            <span class="lb-tag">${p.tag || ''}</span>
                        </td>
                        <td class="lb-club">${p.club?.name ? escapeHtml(p.club.name) : '<span class="lb-no-club">—</span>'}</td>
                        <td class="lb-trophies">${(p.trophies || 0).toLocaleString('en-US')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== PRESTIGE RANKINGS =====
async function fetchPrestigeRankings(container) {
    const cacheKey = `prestige_${lbCurrentCountry}`;
    let data = getLbCache(cacheKey);

    if (!data) {
        const res = await fetch(`/api/rankings/prestige?country=${lbCurrentCountry}`);
        if (!res.ok) {
            // Om API:t inte stödjer prestige/powerplay, visa ett meddelande
            if (res.status === 404) {
                container.innerHTML = `
                    <div class="lb-error">
                        <h4>Prestige ranking not available</h4>
                        <p>The Brawl Stars API may not have updated prestige data for this region yet.</p>
                        <p class="lb-error-detail">Try a different country or try again later.</p>
                    </div>
                `;
                return;
            }
            throw new Error(`API error: ${res.status}`);
        }
        data = await res.json();
        if (data.error) throw new Error(data.error);
        setLbCache(cacheKey, data);
    }

    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = `
            <div class="lb-error">
                <h4>No prestige data found</h4>
                <p>The prestige season may not have started yet, or there is no data for this region.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="lb-prestige-header">
            <h4>Prestige Leaderboard</h4>
            <p>Top-ranked players in the competitive prestige system</p>
        </div>
        <table class="lb-table">
            <thead>
                <tr>
                    <th class="lb-rank">#</th>
                    <th class="lb-name">Player</th>
                    <th class="lb-club">Club</th>
                    <th class="lb-trophies">Prestige Points</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((p, i) => `
                    <tr class="${i < 3 ? 'lb-top-' + (i + 1) : ''}">
                        <td class="lb-rank">${getRankBadge(p.rank || i + 1)}</td>
                        <td class="lb-name">
                            <span class="lb-player-name">${escapeHtml(p.name)}</span>
                            <span class="lb-tag">${p.tag || ''}</span>
                        </td>
                        <td class="lb-club">${p.club?.name ? escapeHtml(p.club.name) : '<span class="lb-no-club">—</span>'}</td>
                        <td class="lb-trophies">${(p.trophies || p.points || 0).toLocaleString('en-US')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== HELPERS =====
function getRankBadge(rank) {
    if (rank === 1) return '<span class="lb-medal lb-gold">1</span>';
    if (rank === 2) return '<span class="lb-medal lb-silver">2</span>';
    if (rank === 3) return '<span class="lb-medal lb-bronze">3</span>';
    return `<span class="lb-rank-num">${rank}</span>`;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
