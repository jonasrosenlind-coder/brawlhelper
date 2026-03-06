// ===== CREATOR.JS — AI Brawler Creator (Pollinations.ai) =====

const BRAWLER_STORAGE_KEY = 'brawlhelper_custom_brawlers';

function loadCustomBrawlers() {
    try { return JSON.parse(localStorage.getItem(BRAWLER_STORAGE_KEY)) || []; }
    catch { return []; }
}

function saveCustomBrawlers(brawlers) {
    localStorage.setItem(BRAWLER_STORAGE_KEY, JSON.stringify(brawlers));
    updateBrawlerCounts();
}

function addCustomBrawler(brawler) {
    const brawlers = loadCustomBrawlers();
    brawler.id = Date.now().toString();
    brawlers.push(brawler);
    saveCustomBrawlers(brawlers);
}

function deleteCustomBrawler(id) {
    saveCustomBrawlers(loadCustomBrawlers().filter(b => b.id !== id));
}

function updateBrawlerCounts() {
    const count = loadCustomBrawlers().length;
    const el = document.getElementById('library-count');
    const navEl = document.getElementById('library-count-nav');
    if (el) el.textContent = count;
    if (navEl) navEl.textContent = count > 0 ? `(${count})` : '';
}

const ABILITY_FIELDS = [
    { prefix: 'attack', label: 'Attack' },
    { prefix: 'super', label: 'Super' },
    { prefix: 'gadget', label: 'Gadget' },
    { prefix: 'sp', label: 'Star Power' },
    { prefix: 'hyper', label: 'Hypercharge' }
];

let currentDescription = '';
let currentImageUrl = '';

function initCreatorPage() {
    // Reset to step 1
    document.getElementById('cr-step1').classList.remove('hidden');
    document.getElementById('cr-step2').classList.add('hidden');
    document.getElementById('cr-loading').classList.add('hidden');

    // Clear fields
    document.getElementById('cr-description').value = '';
    document.getElementById('cr-name').value = '';
    const commonRadio = document.querySelector('input[name="cr-rarity"][value="Common"]');
    if (commonRadio) commonRadio.checked = true;

    ABILITY_FIELDS.forEach(f => {
        const nameEl = document.getElementById(`cr-${f.prefix}-name`);
        const descEl = document.getElementById(`cr-${f.prefix}-desc`);
        if (nameEl) nameEl.value = '';
        if (descEl) descEl.value = '';
    });

    currentDescription = '';
    currentImageUrl = '';
}

function buildPollinationsPrompt(userDescription) {
    return `Brawl Stars character portrait icon, ${userDescription}, Supercell art style, colorful cartoon game character, thick black outlines, vibrant colors, dark gradient background, high quality game icon, front facing`;
}

async function generateBrawlerImage() {
    const descEl = document.getElementById('cr-description');
    const description = descEl.value.trim();

    if (!description) {
        descEl.style.borderColor = 'var(--danger)';
        descEl.placeholder = 'You need to describe your brawler first!';
        descEl.focus();
        setTimeout(() => {
            descEl.style.borderColor = '';
            descEl.placeholder = 'Example: A fierce robot warrior with glowing blue eyes...';
        }, 2000);
        return;
    }

    currentDescription = description;

    // Show loading
    document.getElementById('cr-loading').classList.remove('hidden');
    document.getElementById('cr-generate-btn').disabled = true;

    const prompt = buildPollinationsPrompt(description);
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true`;

    try {
        // Preload image to check it works
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        });

        currentImageUrl = imageUrl;

        // Show step 2
        document.getElementById('cr-generated-img').src = imageUrl;
        document.getElementById('cr-step1').classList.add('hidden');
        document.getElementById('cr-loading').classList.add('hidden');
        document.getElementById('cr-step2').classList.remove('hidden');

    } catch (err) {
        document.getElementById('cr-loading').classList.add('hidden');
        document.getElementById('cr-generate-btn').disabled = false;
        alert('Could not generate image. Try again or change description.');
    }
}

async function regenerateBrawlerImage() {
    if (!currentDescription) return;

    const imgEl = document.getElementById('cr-generated-img');
    const regenBtn = document.getElementById('cr-regenerate-btn');
    regenBtn.disabled = true;
    regenBtn.textContent = 'Generating...';
    imgEl.style.opacity = '0.4';

    const prompt = buildPollinationsPrompt(currentDescription);
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true`;

    try {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        });

        currentImageUrl = imageUrl;
        imgEl.src = imageUrl;
    } catch (err) {
        alert('Could not regenerate. Try again.');
    }

    imgEl.style.opacity = '';
    regenBtn.disabled = false;
    regenBtn.textContent = 'Regenerate';
}

function saveCreatorBrawler() {
    const name = document.getElementById('cr-name').value.trim();
    if (!name) {
        const inp = document.getElementById('cr-name');
        inp.style.borderColor = 'var(--danger)';
        inp.placeholder = 'You must give a name!';
        inp.focus();
        setTimeout(() => { inp.style.borderColor = ''; inp.placeholder = 'Name your brawler...'; }, 2000);
        return;
    }

    const brawler = {
        name: name,
        rarity: document.querySelector('input[name="cr-rarity"]:checked').value,
        description: currentDescription,
        imageUrl: currentImageUrl
    };

    ABILITY_FIELDS.forEach(f => {
        brawler[f.prefix + 'Name'] = document.getElementById(`cr-${f.prefix}-name`).value.trim();
        brawler[f.prefix + 'Desc'] = document.getElementById(`cr-${f.prefix}-desc`).value.trim();
    });

    addCustomBrawler(brawler);

    const btn = document.getElementById('cr-save-btn');
    const orig = btn.textContent;
    btn.textContent = 'SAVED!';
    btn.style.background = 'linear-gradient(180deg, #2ecc71, #27ae60)';
    setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        initCreatorPage();
    }, 1200);
}

// Setup — one-time event listeners
(function() {
    updateBrawlerCounts();

    document.getElementById('cr-generate-btn').addEventListener('click', generateBrawlerImage);
    document.getElementById('cr-regenerate-btn').addEventListener('click', regenerateBrawlerImage);
    document.getElementById('cr-save-btn').addEventListener('click', saveCreatorBrawler);
    document.getElementById('cr-back-btn').addEventListener('click', () => {
        document.getElementById('cr-step2').classList.add('hidden');
        document.getElementById('cr-step1').classList.remove('hidden');
        document.getElementById('cr-generate-btn').disabled = false;
    });
})();
