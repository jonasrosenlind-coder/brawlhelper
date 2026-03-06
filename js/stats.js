// ===== STATS.JS — Player Statistics =====

// API base — works both on localhost (node server) and deployed (Vercel serverless)
function getApiBase() {
    return '/api/player';
}

// Allow Enter key to search
document.getElementById('player-tag-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchPlayer();
});

async function ensureBrawlersLoaded() {
    if (typeof allBrawlers !== 'undefined' && allBrawlers.length > 0) return;
    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        if (typeof allBrawlers !== 'undefined') {
            allBrawlers = data.list || data;
        }
    } catch (e) {}
}

async function searchPlayer() {
    const input = document.getElementById('player-tag-input');
    const container = document.getElementById('player-stats');
    let tag = input.value.trim();

    if (!tag) {
        showStatsError('Enter a player tag to search.');
        return;
    }

    // Clean up the tag
    tag = tag.toUpperCase().replace(/O/g, '0'); // Common mistake: O instead of 0
    if (!tag.startsWith('#')) {
        tag = '#' + tag;
    }

    container.classList.remove('hidden');
    container.innerHTML = '<div class="loader"></div>';

    // Make sure brawler images are loaded from Brawlify
    await ensureBrawlersLoaded();

    try {
        const encodedTag = encodeURIComponent(tag);
        const data = await apiFetch(`${getApiBase()}/${encodedTag}`);

        if (data.error) {
            showStatsError(data.error);
            return;
        }

        if (!data || !data.name) {
            showStatsError('Player not found. Check the tag and try again.');
            return;
        }

        renderPlayerStats(data);
    } catch (err) {
        console.error('Player fetch failed:', err);
        showStatsError('Could not fetch player data. Try again later.');
    }
}

function renderPlayerStats(player) {
    const container = document.getElementById('player-stats');

    const trophies = player.trophies || 0;
    const highestTrophies = player.highestTrophies || player.bestTrophies || 0;
    const level = player.expLevel || player.level || '?';
    const victories3v3 = player['3vs3Victories'] || player.victories3v3 || 0;
    const soloVictories = player.soloVictories || 0;
    const duoVictories = player.duoVictories || 0;
    const brawlerCount = player.brawlers?.length || 0;

    // Map brawler names to image URLs from our cached brawler data
    const brawlerImageMap = {};
    if (typeof allBrawlers !== 'undefined' && allBrawlers.length > 0) {
        allBrawlers.forEach(b => {
            brawlerImageMap[b.name.toUpperCase()] = b.imageUrl || b.imageUrl2 || '';
        });
    }

    const brawlersHtml = (player.brawlers || [])
        .sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
        .map(brawler => {
            const name = brawler.name || 'Unknown';
            const displayName = name.charAt(0) + name.slice(1).toLowerCase();
            const imgUrl = brawler.imageUrl || brawlerImageMap[name.toUpperCase()] || '';
            return `
                <div class="player-brawler-card">
                    ${imgUrl ? `<img src="${imgUrl}" alt="${displayName}">` : ''}
                    <div class="pb-info">
                        <div class="pb-name">${displayName}</div>
                        <div class="pb-trophies">${brawler.trophies || 0} trophies</div>
                        <div class="pb-rank">Rank ${brawler.rank || '?'} | Power ${brawler.power || '?'}</div>
                    </div>
                </div>
            `;
        }).join('');

    container.innerHTML = `
        <div class="player-header">
            <h2>${player.name}</h2>
            <p class="player-tag-display">${player.tag || ''}</p>
            <div class="player-stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${trophies.toLocaleString()}</div>
                    <div class="stat-label">Trophies</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${highestTrophies.toLocaleString()}</div>
                    <div class="stat-label">Highest Trophies</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${level}</div>
                    <div class="stat-label">Level</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${brawlerCount}</div>
                    <div class="stat-label">Brawlers</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${victories3v3.toLocaleString()}</div>
                    <div class="stat-label">3v3 Wins</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${soloVictories.toLocaleString()}</div>
                    <div class="stat-label">Solo Wins</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${duoVictories.toLocaleString()}</div>
                    <div class="stat-label">Duo Wins</div>
                </div>
            </div>
        </div>

        ${brawlersHtml ? `
            <h4 class="player-brawlers-title">Brawlers (${brawlerCount})</h4>
            <div class="player-brawler-grid">
                ${brawlersHtml}
            </div>
        ` : ''}
    `;

    container.classList.remove('hidden');
}

function showStatsError(message) {
    const container = document.getElementById('player-stats');
    container.innerHTML = `<p class="error-message">${message}</p>`;
    container.classList.remove('hidden');
}
