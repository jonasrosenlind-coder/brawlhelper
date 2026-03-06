// ===== APP.JS — Navigation & Initialization =====

// ===== INTRO ANIMATION =====
(function runIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    const introText = document.getElementById('intro-text');
    const particleContainer = document.getElementById('bomb-particles');

    // Spawn pyro flames + embers in background
    const pyroBg = document.getElementById('pyro-bg');
    if (pyroBg) {
        const flameColors = ['#ff4500', '#ff6a00', '#ffd700', '#ff8c00', '#a855f7', '#c084fc'];
        // Flames
        for (let i = 0; i < 18; i++) {
            const f = document.createElement('div');
            f.className = 'pyro-flame';
            const w = 20 + Math.random() * 40;
            f.style.width = w + 'px';
            f.style.height = (w * 1.5 + Math.random() * 30) + 'px';
            f.style.left = Math.random() * 100 + '%';
            f.style.background = `radial-gradient(ellipse at bottom, ${flameColors[Math.floor(Math.random() * flameColors.length)]}, transparent)`;
            f.style.animationDuration = (2 + Math.random() * 3) + 's';
            f.style.animationDelay = (Math.random() * 3) + 's';
            pyroBg.appendChild(f);
        }
        // Embers
        for (let i = 0; i < 30; i++) {
            const e = document.createElement('div');
            e.className = 'pyro-ember';
            const s = 2 + Math.random() * 5;
            e.style.width = s + 'px';
            e.style.height = s + 'px';
            e.style.left = Math.random() * 100 + '%';
            e.style.background = Math.random() > 0.5 ? '#ffd700' : '#ff6a00';
            e.style.boxShadow = `0 0 ${s + 2}px ${e.style.background}`;
            e.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
            e.style.animationDuration = (1.5 + Math.random() * 3) + 's';
            e.style.animationDelay = (Math.random() * 4) + 's';
            pyroBg.appendChild(e);
        }
    }

    // Spawn particles when the bomb goes off
    setTimeout(() => {
        const colors = ['#ffd700', '#ffe44d', '#a855f7', '#c084fc', '#fff'];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'bomb-particle';
            const angle = (Math.PI * 2 * i) / 30;
            const dist = 120 + Math.random() * 250;
            const px = Math.cos(angle) * dist;
            const py = Math.sin(angle) * dist;
            const size = 4 + Math.random() * 8;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.boxShadow = `0 0 ${size}px ${p.style.background}`;
            p.style.setProperty('--px', px + 'px');
            p.style.setProperty('--py', py + 'px');
            p.style.animation = `particleBurst ${0.6 + Math.random() * 0.5}s ease-out forwards`;
            particleContainer.appendChild(p);
        }
    }, 500);

    // When R-T reaches the middle, shake the text
    setTimeout(() => {
        if (introText) introText.classList.add('shake');
    }, 2800);

    // After R-T flies by, fade out the title text
    setTimeout(() => {
        if (introText) introText.style.transition = 'opacity 0.5s';
        if (introText) introText.style.opacity = '0';
    }, 3600);

    // Larry & Lawrie rise up from below
    const ticketScene = document.getElementById('intro-ticket-scene');
    setTimeout(() => {
        if (ticketScene) ticketScene.classList.add('show');
    }, 4000);

    // Ticket appears in their hands
    const ticket = document.getElementById('intro-ticket');
    setTimeout(() => {
        if (ticket) ticket.classList.add('show');
    }, 4600);

    // Larry & Lawrie + ticket fade away
    setTimeout(() => {
        if (ticketScene) ticketScene.classList.add('fly-away');
    }, 5400);

    // Happy celebration scene appears (Spike celebrating)
    const happyScene = document.getElementById('intro-happy-scene');
    const happyStars = document.getElementById('happy-stars');
    setTimeout(() => {
        if (happyScene) happyScene.classList.add('show');
        // Spawn celebration stars
        if (happyStars) {
            for (let i = 0; i < 12; i++) {
                const star = document.createElement('div');
                star.className = 'happy-star';
                star.textContent = ['★', '✦', '✧', '⭐'][Math.floor(Math.random() * 4)];
                star.style.left = (10 + Math.random() * 80) + '%';
                star.style.top = (10 + Math.random() * 80) + '%';
                star.style.fontSize = (1 + Math.random() * 2) + 'rem';
                star.style.color = Math.random() > 0.5 ? '#ffd700' : '#a855f7';
                star.style.animationDelay = (Math.random() * 0.8) + 's';
                happyStars.appendChild(star);
            }
        }
    }, 5800);

    // Spin and fly into the scene → enter BrawlHelper
    const zoomFlash = document.getElementById('intro-zoom-flash');
    setTimeout(() => {
        if (zoomFlash) zoomFlash.classList.add('active');
        overlay.classList.add('spin-fly-in');
    }, 7200);

    // Remove overlay from DOM
    setTimeout(() => {
        overlay.remove();
    }, 8400);
})();

const BRAWLIFY_BASE = 'https://api.brawlify.com/v1';

// ===== RANDOM COLOR THEME =====
const COLOR_THEMES = [
    { name: 'Orange',      accent: '#f5a623', hover: '#ffbe44', secondary: '#ff6f3c', card: '#1a1a2e', cardHover: '#232342', header: '#12122a', border: '#2a2a4a' },
    { name: 'Red',         accent: '#e74c3c', hover: '#ff6b5b', secondary: '#ff3d6e', card: '#2e1a1a', cardHover: '#422323', header: '#2a1212', border: '#4a2a2a' },
    { name: 'Blue',        accent: '#3498db', hover: '#5bb8f5', secondary: '#2980b9', card: '#1a1e2e', cardHover: '#232b42', header: '#12162a', border: '#2a2e4a' },
    { name: 'Green',       accent: '#2ecc71', hover: '#54e68e', secondary: '#27ae60', card: '#1a2e1e', cardHover: '#234230', header: '#122a16', border: '#2a4a30' },
    { name: 'Cyan',        accent: '#00bcd4', hover: '#33d6ec', secondary: '#0097a7', card: '#1a2a2e', cardHover: '#233e42', header: '#12242a', border: '#2a3e4a' },
    { name: 'Gold',        accent: '#ffd700', hover: '#ffe44d', secondary: '#ffab00', card: '#2e2a1a', cardHover: '#423e23', header: '#2a2412', border: '#4a442a' },
    { name: 'Lime',        accent: '#aaff00', hover: '#c4ff44', secondary: '#76c400', card: '#1e2e1a', cardHover: '#304223', header: '#1a2a12', border: '#344a2a' },
    { name: 'Teal',        accent: '#1abc9c', hover: '#3eddb8', secondary: '#16a085', card: '#1a2e28', cardHover: '#23423c', header: '#122a24', border: '#2a4a40' },
    { name: 'Ice',         accent: '#a8e6ff', hover: '#c8f0ff', secondary: '#7dd4f0', card: '#1a2228', cardHover: '#233240', header: '#121c24', border: '#2a3848' },
    { name: 'Emerald',     accent: '#00e676', hover: '#44ff99', secondary: '#00c853', card: '#1a2e20', cardHover: '#234232', header: '#122a18', border: '#2a4a34' },
    { name: 'Sunset',      accent: '#ff5722', hover: '#ff8a50', secondary: '#e64a19', card: '#2e1c18', cardHover: '#422e24', header: '#2a1410', border: '#4a2e24' },
    { name: 'Electric',    accent: '#00e5ff', hover: '#44edff', secondary: '#00b8d4', card: '#1a262e', cardHover: '#233842', header: '#12202a', border: '#2a384a' },
    { name: 'Ruby',        accent: '#d50000', hover: '#ff1744', secondary: '#b71c1c', card: '#2e1616', cardHover: '#422020', header: '#2a0e0e', border: '#4a2222' },
];

(function applyRandomTheme() {
    const theme = COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-hover', theme.hover);
    root.style.setProperty('--accent-secondary', theme.secondary);
    root.style.setProperty('--bg-card', theme.card);
    root.style.setProperty('--bg-card-hover', theme.cardHover);
    root.style.setProperty('--bg-header', theme.header);
    root.style.setProperty('--border', theme.border);
})();

// Navigation
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(`page-${page}`);
    const btn = document.querySelector(`.nav-btn[data-page="${page}"]`);

    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');

    // Show features-panel only on the home page
    const fp = document.getElementById('features-panel');
    if (fp) fp.style.display = page === 'home' ? '' : 'none';

    // Load data for the page if needed
    if (page === 'brawlers') loadBrawlers();
    if (page === 'gamemodes') loadGameModes();
    if (page === 'quiz') initQuizPage();
    if (page === 'guide') loadGuide();
    if (page === 'voices') loadVoices();
    if (page === 'leaderboard') loadLeaderboard();
    if (page === 'home') checkLiveEvent();
    if (page === 'creator') initCreatorPage();
    if (page === 'mybrawlers') loadMyBrawlers();
    if (page === 'tierlist') loadTierList();


    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Set up nav button clicks
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        navigateTo(btn.dataset.page);
    });
});

// Helper: fetch with error handling
async function apiFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
}

// Helper: format time remaining
function formatTimeRemaining(endTimeStr) {
    const end = new Date(endTimeStr);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h left`;
    }
    return `${hours}h ${minutes}m left`;
}

// Load event rotation on home page
async function loadEventRotation() {
    const container = document.getElementById('event-rotation');
    if (container.dataset.loaded === 'true') return;

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/events`);
        const events = data.active || data.list || data;

        const wrapper = document.getElementById('event-rotation-wrapper');
        if (!Array.isArray(events) || events.length === 0) {
            if (wrapper) wrapper.classList.add('hidden');
            container.dataset.loaded = 'true';
            return;
        }
        if (wrapper) wrapper.classList.remove('hidden');

        container.innerHTML = events.map(event => {
            const mode = event.map?.gameMode || event.gameMode || {};
            const map = event.map || {};

            return `
                <div class="event-card">
                    <div class="event-card-header">
                        ${mode.imageUrl ? `<img src="${mode.imageUrl}" alt="${mode.name || ''}">` : ''}
                        <div class="event-info">
                            <h4>${mode.name || 'Unknown game mode'}</h4>
                            <p>${map.name || 'Unknown map'}</p>
                        </div>
                    </div>
                    <div class="event-card-body">
                        ${map.imageUrl ? `<img class="map-img" src="${map.imageUrl}" alt="${map.name || ''}">` : ''}
                        ${event.endTime ? `<p class="event-time">${formatTimeRemaining(event.endTime)}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        container.dataset.loaded = 'true';
    } catch (err) {
        console.error('Failed to load events:', err);
        container.innerHTML = '<p class="error-message">Could not load events. Please try again later.</p>';
    }
}

// ===== Random Brawler Hero Background =====

const SCENES = ['scene-desert', 'scene-arena', 'scene-jungle', 'scene-lava', 'scene-snow'];

// Scene object templates — actual visual elements for each environment
const SCENE_OBJECTS = {
    'scene-desert': `
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        <div class="scene-sun sun-desert"></div>
        <div class="sand-haze"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="sandstorm-particle"></div>
        <div class="ground-plane ground-desert"></div>
        <div class="cactus cactus-large cactus-pos-1">
            <div class="cactus-body">
                <div class="cactus-arm cactus-arm-left"></div>
                <div class="cactus-arm cactus-arm-right"></div>
            </div>
        </div>
        <div class="cactus cactus-pos-2">
            <div class="cactus-body">
                <div class="cactus-arm cactus-arm-left"></div>
                <div class="cactus-arm cactus-arm-right"></div>
            </div>
        </div>
        <div class="cactus cactus-small cactus-pos-3">
            <div class="cactus-body">
                <div class="cactus-arm cactus-arm-left"></div>
            </div>
        </div>
        <div class="tumbleweed tumbleweed-1"></div>
        <div class="tumbleweed tumbleweed-2"></div>
        <div class="scene-rock rock-desert rock-1"></div>
        <div class="scene-rock rock-desert rock-2"></div>
        <div class="scene-rock rock-desert rock-3"></div>
    `,
    'scene-arena': `
        <div class="cloud cloud-night cloud-1"></div>
        <div class="cloud cloud-night cloud-2"></div>
        <div class="scene-sun moon-arena"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="arena-star-small"></div>
        <div class="shooting-star"></div>
        <div class="ground-plane ground-arena"></div>
        <div class="arena-torch arena-torch-1"></div>
        <div class="arena-torch arena-torch-2"></div>
    `,
    'scene-jungle': `
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        <div class="jungle-vine vine-1"></div>
        <div class="jungle-vine vine-2"></div>
        <div class="ground-plane ground-jungle"></div>
        <div class="grass-tuft grass-1"><span></span></div>
        <div class="grass-tuft grass-2"><span></span></div>
        <div class="grass-tuft grass-3"><span></span></div>
        <div class="grass-tuft grass-4"><span></span></div>
        <div class="grass-tuft grass-5"><span></span></div>
        <div class="grass-tuft grass-6"><span></span></div>
        <div class="jungle-tree jungle-tree-large jungle-tree-pos-1">
            <div class="tree-leaves">
                <div class="tree-leaf tree-leaf-1"></div>
                <div class="tree-leaf tree-leaf-2"></div>
                <div class="tree-leaf tree-leaf-3"></div>
            </div>
            <div class="tree-trunk"></div>
        </div>
        <div class="jungle-tree jungle-tree-pos-2">
            <div class="tree-leaves">
                <div class="tree-leaf tree-leaf-1"></div>
                <div class="tree-leaf tree-leaf-2"></div>
                <div class="tree-leaf tree-leaf-3"></div>
            </div>
            <div class="tree-trunk"></div>
        </div>
        <div class="jungle-tree jungle-tree-pos-3">
            <div class="tree-leaves">
                <div class="tree-leaf tree-leaf-1"></div>
                <div class="tree-leaf tree-leaf-2"></div>
                <div class="tree-leaf tree-leaf-3"></div>
            </div>
            <div class="tree-trunk"></div>
        </div>
        <div class="jungle-bush bush-1"></div>
        <div class="jungle-bush bush-2"></div>
    `,
    'scene-lava': `
        <div class="cloud cloud-dark cloud-1"></div>
        <div class="cloud cloud-dark cloud-2"></div>
        <div class="scene-sun sun-lava"></div>
        <div class="ground-plane ground-lava"></div>
        <div class="lava-formation lava-formation-1"></div>
        <div class="lava-formation lava-formation-2"></div>
        <div class="scene-rock rock-lava rock-1"></div>
        <div class="scene-rock rock-lava rock-2"></div>
        <div class="lava-pool lava-pool-1"></div>
        <div class="lava-pool lava-pool-2"></div>
        <div class="lava-crack lava-crack-1"></div>
        <div class="lava-crack lava-crack-2"></div>
        <div class="lava-ember"></div>
        <div class="lava-ember"></div>
        <div class="lava-ember"></div>
        <div class="lava-ember"></div>
    `,
    'scene-snow': `
        <div class="snow-mountain snow-mountain-1"></div>
        <div class="snow-mountain snow-mountain-2"></div>
        <div class="ground-plane ground-snow"></div>
        <div class="pine-tree pine-tree-pos-1">
            <div class="pine-layer pine-layer-3"></div>
            <div class="pine-layer pine-layer-2"></div>
            <div class="pine-layer pine-layer-1"></div>
            <div class="pine-trunk"></div>
        </div>
        <div class="pine-tree pine-tree-pos-2">
            <div class="pine-layer pine-layer-3"></div>
            <div class="pine-layer pine-layer-2"></div>
            <div class="pine-layer pine-layer-1"></div>
            <div class="pine-trunk"></div>
        </div>
        <div class="pine-tree pine-tree-pos-3">
            <div class="pine-layer pine-layer-3"></div>
            <div class="pine-layer pine-layer-2"></div>
            <div class="pine-layer pine-layer-1"></div>
            <div class="pine-trunk"></div>
        </div>
        <div class="scene-rock rock-snow rock-1"></div>
        <div class="scene-rock rock-snow rock-2"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
        <div class="snowflake"></div>
    `
};

// Brawler voicelines — English, from Brawl Stars (sourced from Brawl Stars Wiki & Zathong)
const VOICELINES = {
    'Shelly': ['"Let\'s go!"', '"Let\'s go get \'em."', '"Let\'s do this."', '"Winning."', '"Bling bling."', '"¡Increíble!"', '"¡Fantástico!"', '"¡Así me gusta!"', '"Yes!"', '"Yippee!"', '"Woo-hoo!"', '"Boom!"', '"Bang."'],
    'Nita': ['"Nita!"', '"Bear!"', '"Mwahahaha!"', '"Yeah!"'],
    'Colt': ['"Brawn and beauty."', '"Time for trouble."', '"Too pretty for pain."', '"Watch out, here I come!"', '"Selfie time."', '"Primetime baby."', '"I\'m too good!"', '"Number one!"', '"Not the face!"', '"Cheater!"', '"Check out my head shot."', '"That\'s gotta hurt."', '"Sorry noob."', '"I want my mommy!"', '"Have mercy!"', '"Pew pew pew!"', '"Bullet storm!"', '"This is too easy!"', '"Check out my guns!"'],
    'Bull': ['"Don\'t mess with the bull!"', '"Yo, I\'m in charge."', '"You wanna brawl?"', '"You better Bull-lieve it!"', '"No one beats the Bull!"', '"The Bull doesn\'t make mistakes!"', '"Don\'t mess with me!"', '"Not funny!"', '"And stay down!"', '"No one breaks Bull\'s rules!"', '"Yeah, that\'ll teach ya."', '"Guilty as charged!"', '"Bull sad..."', '"Bulldozer!"', '"I am the Bull!"', '"Charge!"', '"Angry bull!"', '"I will crush you like a little bug!"'],
    'Brock': ['"Gotta get that loot."', '"Let\'s do this."', '"Time to move to the boombox groove."', '"Game on."', '"Brock is OP!"', '"Brock don\'t stop."', '"I\'m ballin\'."', '"Gotta flex."', '"High score."', '"Ooh, I was laggin\'."', '"You\'re so lucky!"', '"Man, Brock got nerfed."', '"The package explodes!"', '"Boombox, baby!"', '"Turning up the boombox!"', '"Rocket rain!"', '"Move those feet to the boombox beat!"'],
    'El Primo': ['"Showtime."', '"El Primo!"', '"For pain and for glory!"', '"¡Vámonos!"', '"El Primo is here."', '"¡El campeón!"', '"¡Soy el mejor!"', '"Sin dolor, ¡no hay gloria!"', '"The show must go on."', '"¡Buenas noches!"', '"You lose!"', '"Adiós, amigos."', '"Me muero."', '"Adiós mundo cruel."', '"Fists of fury!"', '"Primo punch!"', '"EEEEL PRIMOOOO!"'],
    'Barley': ['"One for the road!"', '"Drink up!"', '"Last call!"', '"Shaken, not stirred."', '"Closing time!"', '"Another round?"'],
    'Poco': ['"Feel the power of music!"', '"Let\'s get this party started!"', '"Gimme a beat!"', '"Let\'s rock!"', '"I\'m stoked!"', '"I\'m turning it up to eleven!"', '"Poco goes loco!"', '"Wow! Dude?"', '"Like, whatever."', '"Not cool..."', '"Too bad, man."', '"That is awful."', '"Still friends?"', '"I\'m bailing."', '"Hey! You broke my guitar!"', '"I got a bone to pick."', '"Musical mayhem!"', '"Lead guitar for the win!"', '"Sweet sounds!"', '"Power chord!"'],
    'Rosa': ['"Aloe aloe aloe."', '"Time to take care of the weeds!"', '"Rosa is my name, botany is my game!"', '"Petals to the meadow!"', '"Botany for the win!"', '"I rose to the occasion!"', '"You grow girl!"', '"Leaf me alone."', '"Blooming \'eck!"', '"Oh, bother."', '"Beaten by a botanist in boxing!"', '"Ready for composting."', '"Weed \'em and reap!"', '"Make like a tree and leaf."', '"I\'m wilting!"', '"Fungus!"', '"Flower power!"', '"Time to blossom!"', '"Kabloom!"'],
    'Rico': ['"I do not come in peace."', '"Ready for battle."', '"Let\'s go."', '"Go team."', '"Teamwork for the win."', '"I am ridiculously amazing."', '"Robot power."', '"Total pwnage."', '"I got skills to pay the bills."', '"You hurt me."', '"That was painful."', '"Ow ow ow!"', '"You are a hacker."', '"I am not sorry."', '"I got you."', '"You have been eliminated."', '"That must have hurt."', '"Game over."', '"I will be back."', '"Domination mode engaged."', '"Playtime is over."', '"Danger. Danger."', '"Unleashing ultimate power."'],
    'Jessie': ['"Jess will fix it!"', '"Build and brawl!"', '"Time to get constructive."', '"We can do this!"', '"I\'m number one!"', '"Technology wins."', '"Socket to ya!"', '"Broken beyond repair."', '"Don\'t mess with Jess!"', '"Constructing!"', '"Great spot."', '"Say hello to my little friend."', '"Turret time!"'],
    'Dynamike': ['"I\'ve got a short fuse."', '"Here, birdie birdie birdie."', '"Who wants some TNT?"', '"Down the mine."', '"Birds are singin\'."', '"Not bad for an old-timer."', '"Don\'t touch my canary."', '"I\'m gettin\' grumpy."', '"Kapowee."', '"Dyno-mite!"'],
    'Tick': ['"Tick tick tick!"', '"Hehehe!"', '"BOOM!"'],
    'Bo': ['"Live strong, as the mountains."', '"I fight for my ancestors."', '"I am guided by the spirits."', '"We must fight for peace!"', '"Patience is the key."', '"The weakness of the enemy makes our strength."', '"The wind speaks to me."', '"May you find peace."', '"Let your spirit soar."', '"There is no death, only a change of worlds."', '"Day and night cannot dwell together."', '"The spirits are calling my name."', '"I am one with nature."', '"There is much to learn."', '"Fly, like an eagle!"', '"My aim is true."', '"My mind is clear."', '"One breath, one shot."'],
    '8-Bit': ['"Game over!"', '"Insert coin to continue."', '"Player one, ready!"', '"Power-up detected."', '"Extra life!"', '"Achievement unlocked."'],
    'Emz': ['"Hashtag I\'m going to win big time."', '"I\'m so overpowered, upvote this."', '"I\'m only here for the trophies."', '"Did someone here unfollow me?"', '"Hashtag winning!"', '"Time to update my blog."', '"And I oop."', '"Sksksksk."', '"I will destroy you!"', '"Hashtag stop the hate!"', '"I\'m like feeling so attacked right now."', '"Hashtag loser."', '"Hashtag no filter!"', '"You totally deserved that."', '"Hashtag boring."', '"Eat my scrunchie!"', '"You\'re like totally not getting a friendship bracelet!"', '"Are you serious?!"', '"Hah, try my new perfume!"', '"Try some Zom-bie, by me!"'],
    'Stu': ['"Safety last!"', '"I\'ll sh-sh-show you crazy!"', '"I\'m cr-r-r-cruisin\' for a bruisin\'!"', '"Time to bu-bu-burn some rubber!"', '"Who wa-wa-wants an autograph?"', '"I\'m one lean mean winnin\' machine!"', '"If only I could feel-feel-feel pain."', '"Nerd alert."', '"You failed the crash test, ya dummy!"', '"Spectacular Stu!"', '"Crash and burn, get fixed, return!"', '"I\'m only a bit broken."', '"Failure builds character!"', '"I\'m just a hunk of junk..."', '"Wheeeee!"', '"Spin to win, baby!"', '"Dash, bash, and crash!"', '"Rush! Crush!"', '"One wheel peel!"'],
    'Piper': ['"I\'m sugar and spice."', '"Come get it."', '"This ain\'t my first rodeo."', '"Gimme some sugar!"', '"Kiss my grits."', '"Well, I do declare!"', '"Mind your manners!"', '"Bless your heart."', '"Aww, sweetie?"', '"You\'re welcome."', '"Aww, too bad."', '"Goodness gracious!"', '"Stick a fork in me, I\'m done."', '"Oh my stars."'],
    'Pam': ['"Mama is here!"', '"Come to Mama!"', '"Mama J knows best!"', '"One scrap at a time."', '"Who\'s been messin\' with my scrapyard?"'],
    'Frank': ['"*ROAAAR*"', '"*grunt*"', '"*SMASH*"'],
    'Bibi': ['"Batter up!"', '"Home run!"', '"Strike three, you\'re out!"', '"Mr. Bat says hi."', '"Knock knock!"'],
    'Bea': ['"Bzzzz!"', '"Honey, I\'m home!"', '"Bee careful!"', '"Oh, honey!"', '"Bee-have yourself!"', '"Pollination time."'],
    'Penny': ['"Plunder and profit!"', '"X marks the spot!"', '"Treasure!"', '"Yo ho ho!"', '"Dead men tell no tales."'],
    'Carl': ['"Geology rocks!"', '"Carl is the name!"', '"This rocks!"', '"Fascinating!"', '"It\'s all about the rock cycle."'],
    'Darryl': ['"Rollin\' rollin\' rollin\'!"', '"Barrel blast!"', '"Arrr!"', '"Full steam ahead!"', '"All hands on deck!"'],
    'Jacky': ['"Drill baby drill!"', '"I\'m jackhammering!"', '"Holy #@%&!"', '"What the #@%&?!"', '"I\'ll #@%& you up!"'],
    'Gale': ['"Winter is coming!"', '"Gale force!"', '"Stay frosty!"', '"Back in my day..."', '"Get off my lawn!"'],
    'Colette': ['"I\'m your number one fan!"', '"Sign my book!"', '"OMG it\'s really you!"', '"I love you so much!"', '"I\'ve got all your merch!"', '"You\'re in my scrapbook!"'],
    'Belle': ['"Bounty hunter!"', '"Dead or alive."', '"Bang bang!"', '"There\'s a price on your head."', '"I always get my mark."'],
    'Ash': ['"Trash time!"', '"I love garbage!"', '"One man\'s trash!"', '"RAGE!"', '"Trashy!"', '"Rubbish!"'],
    'Lola': ['"Fabulous!"', '"All eyes on me!"', '"Star quality!"', '"I\'m the main character."', '"Camera-ready, always."'],
    'Spike': ['"..."', '"*cactus noises*"'],
    'Crow': ['"Let\'s settle this beef."', '"I smell a rat."', '"Don\'t mess with my crew."', '"I\'m the boss of bosses!"', '"Talk is cheap."', '"You cockroach!"', '"I\'m walking here!"', '"You looking at me?"', '"Get outta here."', '"Nice piece of work."', '"Sleeping with the fishes."', '"I always get my mark."', '"Hey, you clipped me."', '"Ka-kaw!"'],
    'Leon': ['"Let\'s go!"', '"We can do this!"', '"Time to brawl."', '"Leon in the lead!"', '"Hey Nita, check me out!"', '"Untouchable."', '"No way!"', '"Don\'t make me get Nita!"', '"Yes yes yes!"', '"Not fair!"', '"You got me."', '"Nita!"', '"Sneaky-time!"', '"Invisibility!"', '"Watch this!"', '"Ha, see ya!"'],
    'Sandy': ['"So tired."', '"I guess I\'ll have to do stuff..."', '"For the win."', '"Calm down everyone."', '"Did I do something?"', '"So tired of winning."', '"Relax!"', '"Whatever."', '"Nap-time."', '"Get some rest."', '"Sweet dreams!"', '"Go to sleep."', '"Honestly? Shut up."', '"Good night."', '"To sleep, perchance to dream."', '"Nighty night."', '"Sand shroud!"', '"Sandstorm!"'],
    'Amber': ['"Fire fire fire!"', '"Feel the burn!"', '"Light it up!"', '"Is it getting hot in here?"', '"Playing with fire!"', '"Burn baby burn!"'],
    'Meg': ['"Mech activated!"', '"Let\'s go, Rob!"', '"Powering up!"', '"Mega Mech online!"', '"Mech suit, engage!"'],
    'Surge': ['"Let\'s party!"', '"It\'s party time."', '"Go go go go!"', '"Surge protector."', '"Somebody call for Surge?"', '"Surge for the win!"', '"To protect and Surge."', '"I got the juice."', '"Surging rage!"', '"You got juiced."', '"I\'m so awesome!"', '"You got served."', '"Surge and destroy."', '"I\'m all out of juice."', '"De-hy-dra-tion."', '"Feel the Surge!"', '"Upgrading."', '"Power Surge!"', '"Super Surge!"', '"Drink up!"'],
    'Edgar': ['"This is so lame."', '"Can\'t believe I have to do this."', '"Boring."', '"Back on the grind."', '"You can\'t make me!"', '"Don\'t look at me!"', '"CEO of Brawl Stars."', '"I low-key wanna win this game."', '"Leave me alone!"', '"Get away from me!"', '"Don\'t touch the scarf!"', '"Don\'t be salty!"', '"Big yikes!"', '"I\'m lagging!"', '"So awesome."', '"Whatever."', '"Wow, hardcore."', '"This is so unfair!"', '"So much tryharding."', '"I\'m shook."'],
    'Byron': ['"Take your medicine!"', '"Doctor\'s orders!"', '"Trust me, I\'m a doctor."', '"A spoonful of poison."', '"Side effects may include losing."'],
    'Squeak': ['"Squeak squeak!"', '"Blblblbl!"', '"Squeeeak!"'],
    'Grom': ['"Special delivery!"', '"Boom boom!"', '"Ha ha!"', '"Package for you!"', '"Signed, sealed, delivered."'],
    'Buzz': ['"No one drowns when I\'m around!"', '"Only a fool messes with my pool!"', '"Time to make a splash!"', '"I dive, people stay alive."', '"Certified life-saver."', '"Ready for duty!"', '"Let the savin\' begin!"', '"I am the pool\'s ruler!"', '"Eat my bubbles!"', '"Not to blow my own whistle, but I\'m awesome."', '"That\'s my whistle!"', '"That\'s a warning!"', '"That\'s a felony!"', '"Rule violation!"', '"Don\'t mess with the whistle!"', '"Obey the rules!"', '"Read. The. Sign."', '"Don\'t touch my floatie!"', '"I just wanted to help!"', '"Why does nobody like me?"', '"Floatie!"', '"I blame the suit!"', '"To the rescue!"', '"Divin\' dinomite!"', '"Feel the floatie!"', '"Splash-down!"', '"First aid fury!"'],
    'Griff': ['"Money money money!"', '"Pay up!"', '"Cha-ching!"', '"That\'ll cost ya."', '"No refunds!"', '"Keep the change."'],
    'Fang': ['"Hiii-YAH!"', '"Kung fu fighting!"', '"Round one, fight!"', '"Flying kick!"', '"Lights, camera, action!"'],
    'Eve': ['"Splashhh!"', '"Bubbly!"', '"Weee!"', '"Mommy\'s here!"', '"My little babies!"'],
    'Janet': ['"Ready for takeoff!"', '"Sky high!"', '"Soaring!"', '"First class only."', '"Flying high!"'],
    'Bonnie': ['"Bonnie and Clyde!"', '"Pew pew!"', '"Catch me if you can!"', '"Clyde, get \'em!"', '"Double trouble!"'],
    'Otis': ['"Shhhh!"', '"Quiet!"', '"Silence!"', '"Zip it!"', '"Mute!"'],
    'Sam': ['"Knuckle sandwich!"', '"Say hello to my fist!"', '"Bam!"', '"Knuckle up!"', '"Heavy hitter!"'],
    'Gus': ['"Spooky!"', '"Boo!"', '"Ghost power!"', '"Haunting time!"', '"Friendly ghost!"'],
    'Chester': ['"Ta-daa!"', '"Magic!"', '"Pick a card!"', '"Nothing up my sleeve!"', '"Abracadabra!"'],
    'Gray': [],
    'Mandy': ['"Bullseye!"', '"Sweet shot!"', '"Candy crush!"', '"Sugar-coated!"', '"Straight to the point."'],
    'Hank': ['"Kaboom!"', '"Watch out below!"', '"Bombs away!"', '"Blowin\' up!"', '"Big boom!"'],
    'Pearl': ['"Surf\'s up!"', '"Splash!"', '"Wave rider!"', '"Ride the wave!"', '"Tidal wave!"'],
    'Larry & Lawrie': ['"Get em, Lawrie!"', '"On it, Larry!"', '"Teamwork!"', '"Together we\'re unstoppable!"', '"Dynamic duo!"'],
    'Angelo': ['"Bzzzz!"', '"Sting operation!"', '"Fly away!"', '"Buzz off!"', '"The sting!"'],
    'Berry': ['"Berry nice!"', '"Sweet!"', '"Juicy!"', '"Smoothie time!"', '"Berry blast!"'],
    'Shade': ['"From the shadows..."', '"Darkness!"', '"You can\'t hide!"', '"Shadow strike!"', '"Into the dark."'],
    'Moe': ['"Dig dig dig!"', '"Underground!"', '"Surprise attack!"', '"Drill time!"', '"Going down!"'],
    'Draco': ['"Dragon power!"', '"Feel my fire!"', '"Roaaar!"', '"Dragon breath!"', '"Burn!"'],
    'Kenji': ['"Blade of honor!"', '"Swift strike!"', '"Haaai-ya!"', '"The way of the blade."', '"Honor!"'],
    'Juju': ['"Voodoo magic!"', '"Cursed!"', '"Hex hex!"', '"Bad juju!"', '"Dark ritual."'],
    'Meeple': ['"Game time!"', '"Roll the dice!"', '"Level up!"', '"Player\'s turn!"', '"Critical hit!"'],
    'Mortis': ['"I bring you the gift of darkness!"', '"Mortis, bringer of doom!"', '"I am a creature of the night!"', '"Have much fear, Mortis is here!"', '"Witness my power!"', '"My excellence is undeniable!"', '"Bear witness to my fitness!"', '"I\'m mortified."', '"You fiend!"', '"How dare you!"', '"You have been bested!"', '"Your soul is mine!"', '"I believe you got owned."', '"Time to rest."', '"Mortally wounded!"', '"Mortis, the mortal."', '"Gloom and doom!"', '"Betrayal!"', '"We shall meet again!"', '"Dash and destroy!"', '"Dashingly handsome!"', '"Slice and dice!"', '"Creatures of the night!"', '"Feel my wrath!"', '"Bringer of bats!"', '"Fly free my pretties!"'],
    'Tara': ['"The shadows speak..."', '"Tara sees all!"', '"Into the void!"', '"Destiny awaits."', '"The cards don\'t lie."'],
    'Gene': ['"Hablablabla!"', '"Come here!"', '"Alakazam!"', '"Ha ha ha!"', '"Wishful thinking!"'],
    'Max': ['"Gotta go fast!"', '"Maximum speed!"', '"Energy drink!"', '"Need for speed!"', '"Turbo time!"', '"Speed is key!"'],
    'Mr. P': ['"Check in please!"', '"Hotel management!"', '"Five stars!"', '"Room service!"', '"No vacancies!"'],
    'Sprout': ['"Photosynthesis!"', '"Planting seeds!"', '"Go green!"', '"Grow grow grow!"', '"Bloom!"'],
    'Lou': ['"Brain freeze!"', '"Ice cold!"', '"Frozen treat!"', '"Chill out!"', '"Stay frosty!"'],
    'Ruffs': ['"Good boy!"', '"Colonel Ruffs reporting!"', '"Woof!"', '"At ease, soldier."', '"For the treat!"'],
    'Lumi': ['"Sparkling!"', '"Light it up!"', '"Shine bright!"'],
    'Clancy': ['"Reporting for duty!"', '"Locked and loaded!"', '"Fire!"', '"Target acquired."', '"Mission complete."'],
    'Melodie': ['"La la la!"', '"Feel the rhythm!"', '"Dance time!"', '"Hit the beat!"', '"Encore!"'],
    'Lily': [],
    'Chuck': ['"All aboard!"', '"Full speed ahead!"', '"Choo choo!"', '"Next stop, victory!"', '"End of the line!"'],
    'Charlie': ['"Trick or treat!"', '"Surprise!"', '"Gotcha!"', '"Peek-a-boo!"', '"Scare time!"'],
    'Mico': ['"Bass drop!"', '"Feel the beat!"', '"Music time!"', '"DJ Mico in the house!"', '"Drop the beat!"'],
    'Kit': ['"Meow!"', '"Purrrfect!"', '"Here kitty kitty!"'],
    'Willow': ['"Spooky scary!"', '"Fear me!"', '"Nightmare!"', '"Sweet dreams..."', '"Boo!"'],
    'Nani': ['"Nani?!"', '"Peep, go!"', '"Target acquired!"', '"Return to sender."', '"Manual override!"'],
    'Cordelius': ['"Into the shadows..."', '"You\'re trapped!"', '"No escape!"', '"My domain!"', '"Welcome to the shadow realm."'],
    'Doug': ['"Order up!"', '"Hot dog!"', '"Serve it fresh!"', '"Come and get it!"', '"Lunch time!"'],
    'Buster': ['"Shield up!"', '"I got you covered!"', '"Protect and serve!"', '"Stay behind me!"', '"Defense mode!"'],
    'R-T': ['"Beep boop!"', '"Signal received."', '"Broadcasting!"', '"Transmitting!"', '"Live on air!"'],
    'Gigi': ['"Fabulous darling!"', '"Style points!"', '"Fashion first!"', '"Runway ready!"', '"Trendsetter!"'],
    'Finx': ['"I like boxes, I\'m not lying!"', '"Finders keepers!"', '"Surprise inside!"', '"What\'s in the box?"', '"Unboxing time!"'],
    'Maisie': ['"Locked on target!"', '"Precision!"', '"Gotcha!"', '"Calculated."', '"Right on the mark."'],
    'Alli': ['"Chomp!"', '"Later, gator!"', '"Snap snap!"', '"See ya later, alligator!"', '"Bite time!"'],
    'Ollie': ['"Radical!"', '"Skateboard time!"', '"Let\'s shred!"', '"Kickflip!"', '"Gnarly!"'],
    'Sirius': ['"The stars align!"', '"Cosmic power!"', '"Starlight!"', '"Celestial!"', '"By the stars!"'],
    'Najia': ['"Ssssstrike!"', '"Slither!"', '"Venomous!"', '"Sssssneak attack!"', '"Fang out!"'],
    'Trunk': ['"Timber!"', '"Root power!"', '"Growing strong!"', '"Deep roots!"', '"Stand tall!"'],
    'Ziggy': ['"Zap zap!"', '"Electric!"', '"Charged up!"', '"Shocking!"', '"Full power!"'],
    'Kaze': ['"Swift as the wind!"', '"Blade storm!"', '"Silent strike!"', '"Wind slash!"', '"The calm before the storm."'],
    'Jae-Yong': ['"Transform!"', '"Full power!"', '"Let\'s do this!"'],
    'Pierce': ['"On point!"', '"Straight shot!"', '"Bullseye!"', '"Precision!"', '"Dead center!"'],
    'Glowbert': ['"Glowing!"', '"Light the way!"', '"Shine on!"'],
    'Mina': ['"Dark magic!"', '"Cursed!"', '"Feel my wrath!"', '"Hex!"', '"Shadow curse!"'],
};

// Fallback voicelines for any brawler not in the list
function getGenericVoicelines(name) {
    return [
        `"I'm ${name}! Let's brawl!"`,
        `"${name} is here!"`,
        `"Let's go! ${name} time!"`,
    ];
}

// Brawler lore/personality quotes — shown in hero background speech bubble
const BRAWLER_LORE = {
    'Shelly': [
        'I grew up in the wasteland and learned to shoot before I could walk.',
        'My shotgun has been in the family for generations. Nobody touches it.',
        'Colt thinks he\'s cool, but he wouldn\'t survive a day in my neighborhood.',
        'I don\'t need a team. But it\'s fun to have one sometimes.',
    ],
    'Colt': [
        'I\'m too handsome to lose. Seriously, look at the hair.',
        'My mom says I\'m the most handsome in all of Brawl Stars. She\'s right.',
        'Shelly? She\'s okay I guess. But she doesn\'t have my style.',
        'I practice in front of the mirror every morning. Perfect aim requires perfect looks.',
    ],
    'Bull': [
        'I run the best restaurant in town. And the toughest.',
        'People ask why I\'m always angry. Have you seen the price of meat?!',
        'Nobody runs from the bill at my restaurant. NOBODY.',
        'Crow and I have a bit of a problem. He sends crows to my roof.',
    ],
    'Nita': [
        'My bear Bruce is my best buddy. We\'ve been together since I was little.',
        'Leon is my brother. He\'s annoying but I love him, I guess.',
        'I talk to animals more than to people. They\'re better listeners.',
        'Bo taught me everything about nature. He\'s kind of like a dad to me.',
    ],
    'Jessie': [
        'I built my first turret when I was six. Mama Pam was so proud!',
        'Scrappy isn\'t just a machine — he\'s my friend!',
        'Mama Pam fixes things with scrap, I build them with ENGINEERING.',
        'One day I\'m going to build a robot smarter than all the brawlers!',
    ],
    'Brock': [
        'Brock is OP — that\'s not an opinion, it\'s a fact.',
        'My boombox goes wherever I go. No brawl without beats.',
        'People say I flex too much. I say they don\'t flex enough.',
        'I was the coolest kid in school. Now I\'m the coolest in the whole arena.',
    ],
    'Dynamike': [
        'My canary and I have been blowing things up since the 1950s.',
        'Kids these days... They don\'t know how to make a real explosion!',
        'I found dynamite in the mine and thought — I can use this!',
        'Barley and I have lunch every Tuesday. Nice guy, a bit sticky.',
    ],
    'Bo': [
        'I\'ve taught Nita and Leon everything they know. Nature is the best teacher.',
        'The spirits guide me — every arrow I shoot has a purpose.',
        'I\'ve lived among the mountains my whole life. The city feels... cramped.',
        'Peace sometimes requires you to fight for it. I wish it weren\'t so.',
    ],
    'El Primo': [
        'NOBODY can beat El Primo in wrestling! I am the champion!',
        'I train every day. These muscles don\'t come on their own!',
        'My mask is my identity. Nobody has seen my face since 2005.',
        'Rosa helps me sometimes with injuries. She\'s good with plants AND bandages.',
    ],
    'Barley': [
        'I serve the best drinks in town. And the most explosive.',
        'Dynamike is my best customer. He always drinks the strongest.',
        'I\'m a robot bartender, but I have more feelings than most humans.',
        'Last call means LAST CALL. Go home or take a cocktail to the face.',
    ],
    'Poco': [
        'Music heals everything — literally, in my case.',
        'I was a legend in life. Now I\'m a legend as a skeleton.',
        'My guitar is called "La Guitarra de los Muertos". It heals souls.',
        'Emz is always trying to take selfies with me. I don\'t get the hype.',
    ],
    'Rosa': [
        'Botany is NOT boring! It\'s the most exciting thing there is!',
        'I\'ve discovered 47 new plant species in the Brawl Stars world.',
        'El Primo comes to me when he\'s injured. Aloe vera fixes everything.',
        'My garden is my paradise. Don\'t touch it. SERIOUSLY.',
    ],
    'Rico': [
        'I\'m programmed to win. There is no other option.',
        'My shots bounce perfectly — I calculated the angle 0.003 seconds in advance.',
        'Piper and I... we have a thing. Don\'t tell the others.',
        'I\'m the most advanced robot in the arena. 8-Bit can\'t even run.',
    ],
    'Penny': [
        'My cannon has sunk more ships than you can count.',
        'The pirate life chose me. And I chose the treasures.',
        'Darryl is my first mate on board. He rolls wherever I point.',
        'Gold, jewels, gems — I collect it all!',
    ],
    'Carl': [
        'DID YOU KNOW that diamonds form under extreme pressure? FASCINATING!',
        'Geology is my life. Every rock has a story to tell!',
        'Jacky doesn\'t understand me. She just wants to drill. I want to STUDY.',
        'My favorite rock? Impossible to choose. It\'s like picking a favorite child.',
    ],
    'Darryl': [
        'I roll, I shoot, I roll again. That\'s my life.',
        'Penny is my captain. I do what she says... mostly.',
        'Living in a barrel is actually pretty cozy.',
        'Arrrr! I can\'t stop rolling. It\'s both a gift and a curse.',
    ],
    'Jacky': [
        'I DRILL things. That\'s what I do. Don\'t like it? Tough #@%&!',
        'Carl talks about rocks all #@%& day. SHUT UP, Carl!',
        'My jackhammer is called "Big Bertha". She\'s my best friend.',
        'I\'ve built half the city. The other half I\'ve demolished.',
    ],
    'Piper': [
        'I may look sweet, but my aim is deadly, honey.',
        'Rico and I have... it\'s complicated. He\'s a robot. I know.',
        'I baked cupcakes today. With explosives inside. Surprise!',
        'In the south where I grew up, you learned to shoot before you learned to read.',
    ],
    'Pam': [
        'Jessie got her talent from me. Mama fixes EVERYTHING with scrap.',
        'My healing station can cure anything. Except stupidity.',
        'I\'ve been taking care of brawlers since before they were famous.',
        'Jessie\'s dad? We don\'t talk about that. I do just fine on my own.',
    ],
    'Frank': [
        '*pounds the ground* ...that was my version of a greeting.',
        '*grunt* ...I don\'t talk much. My hammer does the talking.',
        '*roar* ...Emz says I should work on my communication.',
    ],
    'Bibi': [
        'Mr. Bat and I have been partners in crime since I was 13.',
        'Bull tries to act tough in his restaurant. But I\'m tougher.',
        'I used to play baseball, but they said I hit too hard. Their problem!',
        'Nobody touches my crew. NOBODY.',
    ],
    'Bea': [
        'Bees are amazing creatures! I study them every day!',
        'Rosa and I share a lab sometimes. She likes plants, I like bees!',
        'My drone follows me everywhere. It\'s called "Honey".',
        'Did you know bees can communicate through dancing? I can too!',
    ],
    'Spike': [
        '...🌵',
        '...*smiles quietly*...',
    ],
    'Crow': [
        'I run the mafia in Brawl Stars. Everyone knows it.',
        'Bull and I have a rivalry. His restaurant is on MY territory.',
        'Poison is nature\'s way of saying "don\'t touch me". I agree.',
        'My crows see everything. Nothing happens without me knowing about it.',
    ],
    'Leon': [
        'Nita is my big sister. She fights with a bear, I can turn invisible. Cool family.',
        'Bo taught me to hunt. Now I hunt brawlers instead of animals.',
        'Being invisible is awesome. I sneak into Colt\'s room and hide his comb.',
        'I may look young, but I\'m more dangerous than most adults.',
    ],
    'Sandy': [
        'I slept 16 hours yesterday. It was a good day.',
        'Gene is my mentor... I think. I fell asleep during his lessons.',
        'My sandstorm isn\'t magic. I just yawn really hard.',
        'Why do people brawl? You could just sleep instead.',
    ],
    'Amber': [
        'Fire is BEAUTIFUL! Don\'t you get it?! It dances!',
        'I set my house on fire by accident. Three times. This week.',
        'People run from me. I don\'t get it, I just want to share the warmth!',
        'My flamethrower is called "Sparky". We have amazing chemistry.',
    ],
    'Mortis': [
        'I have lived for thousands of years. You mortals amuse me.',
        'My hat is the finest in all of the underworld. Frank doesn\'t understand fashion.',
        'Emz is my niece. She\'s annoying but she has a good Instagram.',
        'Being immortal sounds cool until you realize your Netflix queue never ends.',
    ],
    'Tara': [
        'The cards reveal everything. Your future, your past, your secrets.',
        'Gene and I come from the same magical dimension. He talks nonsense.',
        'I see things no one else sees. Sometimes I wish I didn\'t.',
        'My shadows have their own personalities. They don\'t like each other.',
    ],
    'Gene': [
        'Hablablabla! ...sorry, that\'s all I can say sometimes.',
        'I was a mighty spirit in a lamp. Now I brawl. Upgrade? Maybe.',
        'Sandy falls asleep during my magic lessons. Every. Single. Time.',
        'Tara thinks she\'s mysterious. I\'m LITERALLY magical!',
    ],
    'Max': [
        'SPEED! I drink energy drinks for breakfast, lunch, and dinner!',
        'I\'m a superhero! Well, I try to be one anyway.',
        'Surge is my sidekick. He says he\'s his own hero. Cute.',
        'My superpower is speed. And never sleeping. Those are related.',
    ],
    'Surge': [
        'Max says I\'m her sidekick. I\'m my OWN HERO!',
        'Every time I upgrade I get stronger. Literally level up!',
        'I\'m powered by JUICE! Not regular juice, SUPER-juice!',
        'Dying and losing upgrades is the worst. Respawn-depressed.',
    ],
    'Edgar': [
        'Everything is so BORING. Except brawling. That\'s kinda okay.',
        'Griff forces me to work in his store. I hate it.',
        'Colette is my coworker. She\'s OBSESSED with everyone. Creepy.',
        'My scarf is NOT a fashion statement. It\'s my weapon. Kinda.',
    ],
    'Emz': [
        'OMG, I have like 3 million followers on BrawlGram.',
        'Mortis Frank is my uncle. So embarrassing.',
        'Poco wanted a selfie with me yesterday. I was like "obviously".',
        'Being a zombie influencer is HARD. But someone has to do it.',
    ],
    'Stu': [
        'I cr-cr-crash into things to ENTERTAIN! That\'s my job!',
        'My stunt shows always sell out! Mostly because people want to see me crash.',
        'I\'ve broken down 47 times this week. New record!',
        'Safety last! That\'s my motto and my way of life!',
    ],
    'Buzz': [
        'NOBODY runs by my pool! The RULES exist for a reason!',
        'I was a trombone player before I became a lifeguard. True story.',
        'My float is called "Mr. Floatie". Don\'t touch him.',
        'I\'ve saved zero people. But I\'ve STOPPED a lot of running!',
    ],
    'Byron': [
        'I\'m a doctor. Trust me. My medicines only have MINOR side effects.',
        'Edgar and Colette shop at my store. Edgar always complains.',
        'Healing and poison are the same thing — it just depends on the dose.',
        'My pharmacy sells everything. Health, harm, and everything in between.',
    ],
    'Belle': [
        'I\'ve been hunting outlaws my whole life. Now I hunt brawlers.',
        'There\'s always a bounty. And I always find my target.',
        'Jessie... she doesn\'t know it, but we have a complicated past.',
        'In the wild west, only the fastest survived. I\'m still alive.',
    ],
    'Colette': [
        'I have ALL the brawlers in my scrapbook! All of them! ALL!',
        'Spike smiled at me once. THE BEST DAY OF MY LIFE!',
        'I work with Edgar at Griff\'s store. He\'s SO cool. Kinda.',
        'I collect everything! Hair strands, autographs, photos... is that weird?',
    ],
    'Pam': [
        'Jessie got her talent from me. Mama fixes EVERYTHING with scrap.',
        'My healing station can cure anything. Except stupidity.',
        'I\'ve been taking care of brawlers since before they were famous.',
    ],
    'Gale': [
        'I worked at Mr. P\'s hotel for 30 years. Now I blow guests away.',
        'In MY day we had no gadgets. Just a snowblower and a dream.',
        'Mr. P is the worst boss I\'ve ever had. But the job has its perks.',
        'Kids these days... they don\'t know what real cold weather is.',
    ],
    'Ash': [
        'TRASH IS BEAUTIFUL! Why doesn\'t anyone understand that?!',
        'The angrier I get, the stronger I get. And I\'m always angry.',
        'My rats are my buddies. They never judge.',
        'People throw away things that still work! I save them. I\'m a HERO.',
    ],
    'Lou': [
        'I make the best ice cream in town. It freezes your enemies!',
        'Cold as ice, sweet as ice cream. That\'s me.',
        'Brain freeze isn\'t a side effect — it\'s a FEATURE.',
    ],
    'Ruffs': [
        'I am Colonel Ruffs. I lead the intergalactic dog brigade.',
        'Squeak was my experiment gone wrong. Very wrong.',
        'Cats are the enemy. Especially Kit. NEVER trust a cat.',
    ],
    'Tick': [
        'Hehehe! *ticking sounds*',
        'My head IS a bomb. And that\'s AWESOME!',
    ],
    '8-Bit': [
        'I\'m an arcade machine from the 80s. Nostalgia keeps me alive.',
        'I wish I could run faster. My processor is from 1986.',
        'Game over? Insert coin to continue. Or just respawn.',
    ],
    'Mr. P': [
        'My hotel has zero stars on Yelp. It\'s the GUESTS\' fault.',
        'Gale has worked for me for 30 years. He snows up the lobby sometimes.',
        'Bellhops, service, everything is chaos. But the money keeps rolling in!',
    ],
    'Sprout': [
        'I\'m a robot that loves plants! Rosa built me!',
        'Every day I plant new flowers. The world needs more green!',
        'My walls of plants stop enemies AND produce oxygen! Win-win!',
    ],
    'Griff': [
        'MONEY! Everything is about money! Edgar and Colette work for ME.',
        'Every gem spent in my store makes me happier.',
        'Discount? What is a "discount"? Never heard of it.',
    ],
    'Fang': [
        'I\'m the biggest kung fu movie star in Brawl Stars!',
        'Every kick is choreographed to perfection.',
        'I do all my own stunts. Stu wishes he were me.',
    ],
    'Lola': [
        'I\'m the star. Everyone else is an extra in MY movie.',
        'The camera loves me. All cameras. Everywhere.',
        'Fabulous isn\'t just a word — it\'s my lifestyle.',
    ],
    'Eve': [
        'My little babies help me in battle! Mama power!',
        'I come from outer space. Your planet is... interesting.',
        'Flying over water? Easy. Understanding humans? Hard.',
    ],
    'Janet': [
        'I fly high while you crawl on the ground. Literally.',
        'Bonnie is my little sister. She blows things up. I sing.',
        'My voice can literally kill. Trust me.',
    ],
    'Bonnie': [
        'Janet is my sister. She sings, I EXPLODE things!',
        'Clyde is my best buddy cannon. We do everything together!',
        'I may be small, but my cannon is HUGE!',
    ],
    'Sam': [
        'My brass knuckles solve all problems. ALL of them.',
        'I don\'t need finesse. I have fists.',
    ],
    'Gus': [
        'I\'m a ghost, but I\'m friendly! Promise!',
        'Being a ghost is lonely sometimes. But I can fly through walls!',
    ],
    'Chester': [
        'My magic is unpredictable — even for ME!',
        'I never know what my next trick will be. That\'s half the charm!',
        'Ta-daa! ...wait, that wasn\'t the right trick.',
    ],
    'Gray': [
        '...',
        '*observes quietly*',
    ],
    'Mandy': [
        'One shot, one target. I never miss.',
        'Candy and precision — my two favorite things.',
    ],
    'Lily': [
        '*quiet nature sounds*',
        '...',
    ],
    'Kit': [
        'Meow! *jumps on the nearest brawler*',
        'I may look cute, but I have claws. Sharp ones.',
        'Ruffs doesn\'t like me. Feeling is mutual, doggy.',
    ],
};

// Fallback lore for brawlers not in the list
function getGenericLore(name) {
    return [
        `Hey! I'm ${name} and I'm ready to brawl!`,
        `${name} here — ready for action!`,
    ];
}

async function initBackground() {
    const heroImg = document.getElementById('bg-hero-img');
    const scene = document.getElementById('bg-hero-scene');
    const objectsContainer = document.getElementById('bg-scene-objects');
    if (!heroImg || !scene) return;

    // Random scene
    const randomScene = SCENES[Math.floor(Math.random() * SCENES.length)];
    scene.className = 'bg-hero-scene ' + randomScene;

    // Inject scene objects
    if (objectsContainer && SCENE_OBJECTS[randomScene]) {
        objectsContainer.innerHTML = SCENE_OBJECTS[randomScene];
    }

    // Random brawler position on ground
    const positions = ['pos-left', 'pos-right'];
    const randomPos = positions[Math.floor(Math.random() * positions.length)];
    heroImg.classList.add(randomPos);

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        const brawlers = data.list || data;

        // Pick a random brawler
        const brawler = brawlers[Math.floor(Math.random() * brawlers.length)];

        // Use full body image (imageUrl2 = borderless full body, imageUrl3 = full model)
        heroImg.src = brawler.imageUrl3 || brawler.imageUrl2 || brawler.imageUrl || '';

        // Show lore/personality speech bubble
        const brawlerName = brawler.name || '';
        const loreLines = BRAWLER_LORE[brawlerName] || getGenericLore(brawlerName);
        if (loreLines && loreLines.length > 0) {
            const line = loreLines[Math.floor(Math.random() * loreLines.length)];
            const speechPos = randomPos === 'pos-left' ? 'speech-left'
                            : randomPos === 'pos-right' ? 'speech-right'
                            : 'speech-center';

            const bubble = document.createElement('div');
            bubble.className = `brawler-speech ${speechPos}`;
            bubble.innerHTML = `<span class="speech-name">${brawlerName}</span>${line}`;

            const heroContainer = document.getElementById('bg-brawler-hero');
            if (heroContainer) heroContainer.appendChild(bubble);
        }
    } catch (err) {
        // Decorative — fail silently
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkLiveEvent();
    initBackground();

    // Feature links on home page
    document.querySelectorAll('.feature-link').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.page);
        });
    });

    // Idea count on load
    updateIdeaCount();
});

// ===== IDEA BOX (server-based) =====
function updateIdeaCount() {
    fetch('/api/ideas').then(r => r.json()).then(ideas => {
        const el = document.getElementById('idea-count');
        if (el) el.textContent = ideas.length;
    }).catch(() => {});
}

function openIdeaModal() {
    document.getElementById('idea-modal').classList.remove('hidden');
    document.getElementById('idea-list').classList.add('hidden');
    document.getElementById('idea-text').value = '';
}

function closeIdeaModal() {
    document.getElementById('idea-modal').classList.add('hidden');
}

async function submitIdea() {
    const text = document.getElementById('idea-text').value.trim();
    if (!text) return;
    await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    document.getElementById('idea-text').value = '';
    updateIdeaCount();
    alert('Thanks for your idea!');
}

async function viewIdeas() {
    const list = document.getElementById('idea-list');
    const ideas = await fetch('/api/ideas').then(r => r.json()).catch(() => []);
    if (ideas.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);text-align:center;">No ideas yet. Be the first!</p>';
    } else {
        list.innerHTML = ideas.map(i => {
            const d = new Date(i.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            return `<div class="idea-item"><div class="idea-date">${d}</div><div class="idea-content">${i.text.replace(/</g,'&lt;')}</div></div>`;
        }).join('');
    }
    list.classList.toggle('hidden');
}

// ===== ADMIN =====
let adminPassword = '';

function openAdminLogin() {
    if (adminPassword) {
        navigateTo('admin');
        loadAdminData();
        return;
    }
    document.getElementById('admin-login-modal').classList.remove('hidden');
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-login-error').style.display = 'none';
}

function closeAdminLogin() {
    document.getElementById('admin-login-modal').classList.add('hidden');
}

async function adminLogin() {
    const pw = document.getElementById('admin-password').value;
    const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw })
    });
    if (res.ok) {
        adminPassword = pw;
        closeAdminLogin();
        const adminBtn = document.getElementById('admin-bottom-btn');
        if (adminBtn) adminBtn.classList.remove('hidden');
        navigateTo('admin');
        loadAdminData();
    } else {
        document.getElementById('admin-login-error').style.display = 'block';
    }
}

async function loadAdminData() {
    // Load ideas
    const ideas = await fetch('/api/ideas').then(r => r.json()).catch(() => []);
    document.getElementById('admin-idea-count').textContent = ideas.length;
    const list = document.getElementById('admin-ideas-list');
    if (ideas.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);">No ideas yet.</p>';
    } else {
        list.innerHTML = ideas.map(i => {
            const d = new Date(i.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            return `<div class="admin-idea-item">
                <div class="admin-idea-text"><div class="admin-idea-date">${d}</div>${i.text.replace(/</g,'&lt;')}</div>
                <button class="admin-idea-delete" onclick="adminDeleteIdea(${i.id})">Delete</button>
            </div>`;
        }).join('');
    }

    // Load event status
    const event = await fetch('/api/event').then(r => r.json()).catch(() => ({ active: false }));
    const indicator = document.getElementById('admin-event-indicator');
    const composer = document.getElementById('admin-event-composer');
    if (event.active) {
        indicator.textContent = 'Event is LIVE: ' + (event.title || '');
        indicator.className = 'admin-event-on';
        composer.classList.remove('hidden');
    } else {
        indicator.textContent = 'No active event';
        indicator.className = 'admin-event-off';
        composer.classList.add('hidden');
    }
}

async function adminDeleteIdea(id) {
    await fetch('/api/ideas/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, id })
    });
    loadAdminData();
}

async function adminStartEvent() {
    const title = document.getElementById('admin-event-title').value.trim() || 'Event';
    const type = document.getElementById('admin-event-type').value;
    await fetch('/api/event/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, title, type })
    });
    await loadAdminData();
    await checkLiveEvent();
}

async function adminStopEvent() {
    if (!confirm('Stop the live event?')) return;
    await fetch('/api/event/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
    });
    await loadAdminData();
    await checkLiveEvent();
}

async function adminSendMessage() {
    const textarea = document.getElementById('admin-event-msg');
    const text = textarea.value.trim();
    if (!text) return;
    await fetch('/api/event/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, text })
    });
    textarea.value = '';
    await loadAdminData();
    await checkLiveEvent();
}

// ===== LIVE EVENT POLLING =====
let liveMessages = [];
let liveMessageIndex = 0;
let liveMessageTimer = null;

function showNextLiveMessage() {
    const msgEl = document.getElementById('live-event-message-single');
    if (!msgEl || liveMessages.length === 0) {
        if (msgEl) msgEl.classList.add('hidden');
        return;
    }
    if (liveMessageIndex >= liveMessages.length) liveMessageIndex = 0;
    const m = liveMessages[liveMessageIndex];
    const t = new Date(m.time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    msgEl.innerHTML = `<div class="live-event-msg-time">${t}</div>${m.text.replace(/</g,'&lt;')}`;
    msgEl.classList.remove('hidden');
    msgEl.style.animation = 'none';
    msgEl.offsetHeight;
    msgEl.style.animation = 'msgFadeInOut 40s forwards';
    liveMessageIndex++;
    clearTimeout(liveMessageTimer);
    liveMessageTimer = setTimeout(() => {
        if (liveMessageIndex < liveMessages.length) {
            showNextLiveMessage();
        } else {
            msgEl.classList.add('hidden');
        }
    }, 40000);
}

async function checkLiveEvent() {
    try {
        const event = await fetch('/api/event').then(r => r.json());
        const banner = document.getElementById('live-event-banner');
        const dot = document.getElementById('live-dot');
        const label = document.getElementById('live-label');
        if (event.active) {
            dot.classList.remove('hidden');
            const type = (event.type || 'live').toUpperCase();
            label.textContent = type;
            banner.classList.remove('active', 'active-update');
            banner.style.borderColor = '';
            if (type === 'LIVE') {
                banner.classList.add('active');
                dot.style.background = '#e74c3c';
            } else {
                banner.classList.add('active-update');
                dot.style.background = '#3498db';
            }
            document.getElementById('live-event-title').textContent = event.title || '';
            const newMsgs = event.messages || [];
            // Show new message immediately if a new one arrived
            if (newMsgs.length !== liveMessages.length) {
                liveMessages = newMsgs;
                liveMessageIndex = newMsgs.length - 1;
                showNextLiveMessage();
            }
        } else {
            dot.classList.add('hidden');
            label.textContent = 'No Active Event';
            banner.classList.remove('active', 'active-update');
            banner.style.borderColor = '';
            document.getElementById('live-event-title').textContent = '';
            liveMessages = [];
            liveMessageIndex = 0;
            clearTimeout(liveMessageTimer);
            const msgEl = document.getElementById('live-event-message-single');
            if (msgEl) msgEl.classList.add('hidden');
        }
    } catch (e) {}
}

// Poll every 5 seconds
setInterval(checkLiveEvent, 5000);
checkLiveEvent();
