// ===== CLUBS.JS — Club Finder =====

async function searchClubs() {
    const minTrophies = parseInt(document.getElementById('club-trophies').value) || 0;
    const minMembers = parseInt(document.getElementById('club-min-members').value) || 0;
    const maxMembers = parseInt(document.getElementById('club-max-members').value) || 100;
    const type = document.getElementById('club-type').value;

    const results = document.getElementById('club-results');
    results.classList.remove('hidden');
    results.innerHTML = '<div class="loader"></div>';

    try {
        const baseUrl = '';

        const data = await apiFetch(`${baseUrl}/api/clubs/rankings`);
        let clubs = data.items || data.list || data || [];

        if (!Array.isArray(clubs) || clubs.length === 0) {
            results.innerHTML = `
                <div class="club-empty">
                    <h4>No clubs found</h4>
                    <p>Try different filters.</p>
                </div>
            `;
            return;
        }

        // Filter by criteria
        let filtered = clubs;
        if (minTrophies > 0) {
            filtered = filtered.filter(c => (c.trophies || 0) >= minTrophies);
        }
        if (minMembers > 0) {
            filtered = filtered.filter(c => (c.memberCount || 0) >= minMembers);
        }
        if (maxMembers < 100) {
            filtered = filtered.filter(c => (c.memberCount || 0) <= maxMembers);
        }

        if (filtered.length === 0) {
            results.innerHTML = `
                <div class="club-empty">
                    <h4>No clubs match your filters</h4>
                    <p>Try changing trophies, members, or type.</p>
                </div>
            `;
            return;
        }

        // Sort: most trophies first but prioritize clubs with spots open
        filtered.sort((a, b) => {
            const spotsA = 30 - (a.memberCount || 30);
            const spotsB = 30 - (b.memberCount || 30);
            if (spotsA > 0 && spotsB === 0) return -1;
            if (spotsB > 0 && spotsA === 0) return 1;
            return (b.trophies || 0) - (a.trophies || 0);
        });

        results.innerHTML = `
            <h4 class="club-results-title">${filtered.length} clubs found</h4>
            <div class="club-grid">
                ${filtered.map(club => renderClubCard(club)).join('')}
            </div>
        `;

    } catch (err) {
        console.error('Club search failed:', err);
        results.innerHTML = `
            <div class="club-empty">
                <h4>Could not search clubs</h4>
                <p>Make sure <code>node server.js</code> is running with <code>BRAWL_API_KEY</code>.</p>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">Error: ${err.message}</p>
            </div>
        `;
    }
}

function renderClubCard(club) {
    const tag = club.tag || '';
    const name = club.name || 'Unknown';
    const trophies = (club.trophies || 0).toLocaleString();
    const members = club.memberCount || '?';
    const badgeId = club.badgeId || 8000000;
    const badgeUrl = `https://cdn.brawlify.com/club-badges/regular/${badgeId}.png`;

    const spotsLeft = 30 - (club.memberCount || 30);
    const spotsText = spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full';
    const spotsClass = spotsLeft > 5 ? 'spots-good' : spotsLeft > 0 ? 'spots-few' : 'spots-full';

    return `
        <div class="club-card">
            <div class="club-card-header">
                <img class="club-badge-img" src="${badgeUrl}" alt="" onerror="this.style.display='none'">
                <div class="club-card-name">
                    <h4>${name}</h4>
                    <span class="club-tag">${tag}</span>
                </div>
            </div>
            <div class="club-card-stats">
                <div class="club-stat">
                    <span class="club-stat-value">${trophies}</span>
                    <span class="club-stat-label">Trophies</span>
                </div>
                <div class="club-stat">
                    <span class="club-stat-value">${members}/30</span>
                    <span class="club-stat-label">Members</span>
                </div>
                <div class="club-stat">
                    <span class="club-stat-value">#${club.rank || '?'}</span>
                    <span class="club-stat-label">Rank</span>
                </div>
            </div>
            <div class="club-card-footer">
                <span class="club-spots ${spotsClass}">${spotsText}</span>
                <p class="club-search-tip">Search for <strong>${name}</strong> in Brawl Stars → Social → Clubs</p>
            </div>
        </div>
    `;
}
