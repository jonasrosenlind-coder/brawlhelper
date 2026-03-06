// ===== MUSIC.JS — Spotify Background Music Player =====

const PLAYLIST = [
    { title: 'Hollow', artist: 'Smash Into Pieces', spotifyId: '29zuhsQWT2Ik7sPC2K1gPM' },
    { title: 'Runaway (U & I)', artist: 'Galantis', spotifyId: '7G4EC8SHTpQsHmNfU9D9rU' },
    { title: 'A Sky Full of Stars', artist: 'Coldplay', spotifyId: '0FDzzruyVECATHXKHFs9eJ' },
    { title: 'Heaven Is a Place on Earth', artist: 'W&W & AXMO', spotifyId: '6FAmtZoa7jq6bH9GBjCRkM' },
];

let musicQueue = [];
let musicIndex = 0;

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initMusicPlayer() {
    musicQueue = shuffleArray(PLAYLIST);
    musicIndex = 0;
    renderMusicPlayer();
    loadSong();
}

function loadSong() {
    const song = musicQueue[musicIndex];
    if (!song) return;

    const iframe = document.getElementById('spotify-iframe');
    if (iframe) {
        iframe.src = `https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`;
    }

    const titleEl = document.getElementById('music-song-title');
    const artistEl = document.getElementById('music-song-artist');
    if (titleEl) titleEl.textContent = song.title;
    if (artistEl) artistEl.textContent = song.artist;

    // Update track dots
    document.querySelectorAll('.music-track-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === musicIndex);
    });
}

function skipSong() {
    musicIndex++;
    if (musicIndex >= musicQueue.length) {
        musicQueue = shuffleArray(PLAYLIST);
        musicIndex = 0;
    }
    loadSong();
}

function prevSong() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicQueue.length - 1;
    }
    loadSong();
}

function shufflePlaylist() {
    musicQueue = shuffleArray(PLAYLIST);
    musicIndex = 0;
    loadSong();
}

function toggleMusicPanel() {
    const panel = document.getElementById('music-panel');
    if (panel) panel.classList.toggle('music-panel-open');
}

function renderMusicPlayer() {
    const wrapper = document.createElement('div');
    wrapper.id = 'music-widget';
    wrapper.innerHTML = `
        <button id="music-toggle-btn" class="music-toggle-btn" onclick="toggleMusicPanel()" title="Music Player">🎵</button>
        <div id="music-panel" class="music-panel">
            <div class="music-panel-header">
                <span class="music-panel-label">Music Player</span>
                <button class="music-shuffle-btn" onclick="shufflePlaylist()" title="Shuffle">🔀</button>
            </div>
            <div class="music-song-info">
                <div id="music-song-title" class="music-song-title">—</div>
                <div id="music-song-artist" class="music-song-artist"></div>
            </div>
            <div class="music-nav">
                <button class="music-ctrl-btn" onclick="prevSong()">⏮</button>
                <div class="music-track-dots">
                    ${musicQueue.map((_, i) => `<span class="music-track-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="music-ctrl-btn" onclick="skipSong()">⏭</button>
            </div>
            <div class="spotify-embed-wrapper">
                <iframe id="spotify-iframe"
                    src=""
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style="border-radius: 8px;">
                </iframe>
            </div>
        </div>
    `;
    document.body.appendChild(wrapper);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initMusicPlayer);
