// ===== GAMEMODES.JS — Game Modes & Maps =====

let gameModesLoaded = false;
let allGameModes = [];
let activeEventsByMode = {};
let currentModeCategory = 'all';

// Kategorisera spellägen baserat på API:ts title-fält
function getModeCategory(mode) {
    const title = (mode.title || '').toLowerCase();
    const name = (mode.name || '').toLowerCase();

    // Showdown-typer
    if (name.includes('showdown') || name.includes('lone star') || name.includes('takedown')
        || name.includes('hunters') || title.includes('sole survivor')
        || title.includes('all vs all')) {
        return 'showdown';
    }

    // 5v5
    if (name.includes('5v5') || title.includes('5 vs 5')) {
        return '5v5';
    }

    // 2v2
    if (name.includes('2v2') || title.includes('2 vs 2') || title.includes('teams of two')) {
        return '2v2';
    }

    // 1v1
    if (name.includes('duel') || title.includes('1 vs 1')) {
        return '1v1';
    }

    // Special/Event modes (boss fights, robots, etc)
    if (title.includes('boss') || title.includes('robot') || title.includes('monster')
        || name.includes('robo') || name.includes('big game') || name.includes('boss fight')
        || name.includes('rampage') || name.includes('godzilla')) {
        return 'special';
    }

    // 3v3 (default team mode)
    if (title.includes('3 vs 3') || title.includes('battle for trophies')) {
        return '3v3';
    }

    // Fallback — check name patterns
    if (name.includes('trio')) return '3v3';

    return '3v3';
}

const categoryLabels = {
    'all': 'All',
    '3v3': '3 vs 3',
    '2v2': '2 vs 2',
    '5v5': '5 vs 5',
    '1v1': '1 vs 1',
    'showdown': 'Showdown',
    'special': 'Special',
};

// Beskrivningar för spellägen
const gameModeDescriptions = {
    'Gem Grab': 'Collect 10 gems and hold them for 15 seconds to win. Teamwork is key!',
    'Showdown': 'Solo or Duo battle royale. Collect power cubes and be the last one standing.',
    'Brawl Ball': 'Soccer with brawlers! Score two goals to win. Speed and teamplay decide the match.',
    'Bounty': 'Eliminate enemies to collect stars. The team with the most stars wins!',
    'Heist': 'Attack the enemy safe while defending your own.',
    'Hot Zone': 'Control the zones on the map. Stay in the zone to collect points.',
    'Knockout': 'Best of three rounds. Eliminate the entire enemy team to win a round.',
    'Siege': 'Collect bolts to build a robot that attacks the enemy turret.',
    'Lone Star': 'Free-for-all deathmatch. Collect the most stars by eliminating others.',
    'Takedown': 'Deal the most damage to the boss to win. Watch out for other players!',
    'Duo Showdown': 'Duo battle royale with a partner. Work together to survive.',
    'Solo Showdown': 'Solo battle royale. Collect power cubes and survive!',
    'Wipeout': 'Eliminate the entire enemy team. First team to 3 wipes wins.',
    'Payload': 'Escort the cart to the goal or stop it.',
    'Brawl Ball 5v5': '5 vs 5 soccer with brawlers — twice as chaotic!',
    'Duels': '1 vs 1 — you pick 3 brawlers and face the opponent in best of three.',
    'Basket Brawl': 'Basketball with brawlers! Throw the ball in the basket to score points.',
    'Brawl Hockey': 'Hockey with brawlers! Shoot the puck into the goal.',
    'Volley Brawl': 'Volleyball with brawlers! Hit the ball over the net.',
    'Paint Brawl': 'Paint the most of the map in your team\'s color to win!',
    'Trophy Escape': 'Escape with the trophy — or stop the one who has it!',
};

async function loadGameModes() {
    if (gameModesLoaded) return;

    const container = document.getElementById('gamemodes-list');

    try {
        const [modesData, eventsData] = await Promise.all([
            apiFetch(`${BRAWLIFY_BASE}/gamemodes`),
            apiFetch(`${BRAWLIFY_BASE}/events`).catch(() => ({ active: [] }))
        ]);

        allGameModes = (modesData.list || modesData || []).filter(m => !m.disabled);
        const events = eventsData.active || eventsData.list || [];

        // Build active events map
        activeEventsByMode = {};
        if (Array.isArray(events)) {
            events.forEach(event => {
                const mode = event.map?.gameMode || event.gameMode || {};
                const modeName = mode.name || '';
                if (modeName) {
                    if (!activeEventsByMode[modeName]) activeEventsByMode[modeName] = [];
                    activeEventsByMode[modeName].push(event);
                }
            });
        }

        // Set up category filters
        document.querySelectorAll('.mode-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentModeCategory = btn.dataset.cat;
                renderGameModes();
            });
        });

        renderGameModes();
        gameModesLoaded = true;
    } catch (err) {
        console.error('Failed to load game modes:', err);
        container.innerHTML = '<p class="error-message">Could not load game modes. Please try again later.</p>';
    }
}

function renderGameModes() {
    const container = document.getElementById('gamemodes-list');

    const filtered = currentModeCategory === 'all'
        ? allGameModes
        : allGameModes.filter(m => getModeCategory(m) === currentModeCategory);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="error-message">No game modes in this category.</p>';
        return;
    }

    container.innerHTML = filtered.map(mode => {
        const description = gameModeDescriptions[mode.name] || mode.shortDescription || mode.description || 'Play and have fun!';
        const modeEvents = activeEventsByMode[mode.name] || [];
        const cat = getModeCategory(mode);
        const catLabel = categoryLabels[cat] || cat;

        const mapsHtml = modeEvents.length > 0
            ? modeEvents.map(event => {
                const map = event.map || {};
                return `
                    <div class="map-card">
                        ${map.imageUrl ? `<img src="${map.imageUrl}" alt="${map.name || ''}" loading="lazy">` : ''}
                        <div class="map-card-info">
                            <h5>${map.name || 'Unknown map'}</h5>
                            ${event.endTime ? `<p class="map-time">${formatTimeRemaining(event.endTime)}</p>` : ''}
                        </div>
                    </div>
                `;
            }).join('')
            : '<p style="color: var(--text-muted); padding: 0.5rem;">No active maps right now.</p>';

        const modeColor = mode.color || 'var(--accent)';

        return `
            <div class="gamemode-section">
                <div class="gamemode-header" onclick="toggleGameMode(this)">
                    ${mode.imageUrl ? `<img src="${mode.imageUrl}" alt="${mode.name}">` : ''}
                    <div>
                        <h4 style="color: ${modeColor}">${mode.name}</h4>
                        <p>${description}</p>
                    </div>
                    <div style="margin-left: auto; text-align: right;">
                        <span class="mode-type-tag">${catLabel}</span>
                        ${modeEvents.length > 0 ? `<span class="event-count-tag">${modeEvents.length} active</span>` : ''}
                    </div>
                </div>
                <div class="gamemode-maps" style="display: none;">
                    ${mapsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function toggleGameMode(header) {
    const mapsContainer = header.nextElementSibling;
    const isVisible = mapsContainer.style.display !== 'none';
    mapsContainer.style.display = isVisible ? 'none' : 'grid';
}
