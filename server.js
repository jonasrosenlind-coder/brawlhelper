// Minimal proxy-server för Brawl Stars API
// Kör: node server.js
// Serverar både statiska filer och proxar API-anrop

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

// Read config from config.env file
function loadConfig() {
    const config = { apiKey: '', adminPassword: 'brawladmin123' };
    try {
        const envPath = path.join(__dirname, 'config.env');
        const content = fs.readFileSync(envPath, 'utf-8');
        const apiMatch = content.match(/BRAWL_API_KEY=(.+)/);
        if (apiMatch && apiMatch[1].trim() && apiMatch[1].trim() !== 'SKRIV_DIN_NYCKEL_HÄR') {
            config.apiKey = apiMatch[1].trim();
        }
        const pwMatch = content.match(/ADMIN_PASSWORD=(.+)/);
        if (pwMatch && pwMatch[1].trim()) {
            config.adminPassword = pwMatch[1].trim();
        }
    } catch (e) {}
    config.apiKey = config.apiKey || process.env.BRAWL_API_KEY || '';
    return config;
}

const CONFIG = loadConfig();
const API_KEY = CONFIG.apiKey;

// Data files
const IDEAS_FILE = path.join(__dirname, 'data', 'ideas.json');
const EVENT_FILE = path.join(__dirname, 'data', 'event.json');

function ensureDataDir() {
    const dir = path.join(__dirname, 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

function readJSON(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, 'utf-8')); } catch (e) { return fallback; }
}

function writeJSON(file, data) {
    ensureDataDir();
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Helper to read POST body
function readBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(JSON.parse(body)); } catch (e) { resolve({}); }
        });
    });
}

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
};

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // API proxy: /api/player/TAG
    if (req.url.startsWith('/api/player/')) {
        const tag = req.url.replace('/api/player/', '');

        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas. Starta servern med: BRAWL_API_KEY=din_nyckel node server.js' }));
            return;
        }

        const apiUrl = `https://api.brawlstars.com/v1/players/${tag}`;
        const options = {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå Brawl Stars API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/clubs/search?name=...&minTrophies=...&minMembers=...
    if (req.url.startsWith('/api/clubs/search')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
        const name = params.get('name') || '';
        const minTrophies = parseInt(params.get('minTrophies')) || 0;
        const minMembers = parseInt(params.get('minMembers')) || 0;
        const maxMembers = parseInt(params.get('maxMembers')) || 100;
        const type = params.get('type') || '';

        let apiUrl = `https://api.brawlstars.com/v1/clubs?name=${encodeURIComponent(name)}&limit=50`;
        if (minTrophies > 0) apiUrl += `&minTrophies=${minTrophies}`;
        if (minMembers > 0) apiUrl += `&minMembers=${minMembers}`;
        if (maxMembers < 100) apiUrl += `&maxMembers=${maxMembers}`;
        if (type) apiUrl += `&type=${type}`;

        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå Brawl Stars API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/rankings/prestige?country=global
    if (req.url.startsWith('/api/rankings/prestige')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
        const country = params.get('country') || 'global';
        const apiUrl = `https://api.brawlstars.com/v1/rankings/${encodeURIComponent(country)}/powerplay/players?limit=200`;
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/rankings/players?country=global
    if (req.url.startsWith('/api/rankings/players')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
        const country = params.get('country') || 'global';
        const apiUrl = `https://api.brawlstars.com/v1/rankings/${encodeURIComponent(country)}/players?limit=200`;
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/rankings/clubs?country=global
    if (req.url.startsWith('/api/rankings/clubs')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
        const country = params.get('country') || 'global';
        const apiUrl = `https://api.brawlstars.com/v1/rankings/${encodeURIComponent(country)}/clubs?limit=200`;
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/rankings/brawlers?brawlerId=...&country=global
    if (req.url.startsWith('/api/rankings/brawlers')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
        const country = params.get('country') || 'global';
        const brawlerId = params.get('brawlerId') || '';

        if (!brawlerId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'brawlerId krävs' }));
            return;
        }

        const apiUrl = `https://api.brawlstars.com/v1/rankings/${encodeURIComponent(country)}/brawlers/${encodeURIComponent(brawlerId)}?limit=200`;
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/clubs/rankings (legacy)
    if (req.url.startsWith('/api/clubs/rankings')) {
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const apiUrl = 'https://api.brawlstars.com/v1/rankings/global/clubs?limit=200';
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // API proxy: /api/clubs/TAG (club details)
    if (req.url.startsWith('/api/clubs/') && !req.url.includes('search') && !req.url.includes('rankings')) {
        const tag = req.url.replace('/api/clubs/', '');
        if (!API_KEY) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API-nyckel saknas.' }));
            return;
        }

        const apiUrl = `https://api.brawlstars.com/v1/clubs/${tag}`;
        const options = { headers: { 'Authorization': `Bearer ${API_KEY}` } };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kunde inte nå API', details: err.message }));
        });
        return;
    }

    // ===== IDEAS API =====
    if (req.url === '/api/ideas' && req.method === 'POST') {
        const data = await readBody(req);
        if (!data.text || !data.text.trim()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Text krävs' }));
            return;
        }
        const ideas = readJSON(IDEAS_FILE, []);
        ideas.unshift({
            text: data.text.trim().substring(0, 500),
            date: new Date().toISOString(),
            id: Date.now()
        });
        writeJSON(IDEAS_FILE, ideas);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    if (req.url === '/api/ideas' && req.method === 'GET') {
        const ideas = readJSON(IDEAS_FILE, []);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ideas));
        return;
    }

    if (req.url === '/api/ideas/delete' && req.method === 'POST') {
        const data = await readBody(req);
        if (data.password !== CONFIG.adminPassword) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Fel lösenord' }));
            return;
        }
        let ideas = readJSON(IDEAS_FILE, []);
        ideas = ideas.filter(i => i.id !== data.id);
        writeJSON(IDEAS_FILE, ideas);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    // ===== ADMIN LOGIN =====
    if (req.url === '/api/admin/login' && req.method === 'POST') {
        const data = await readBody(req);
        if (data.password === CONFIG.adminPassword) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
        } else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Fel lösenord' }));
        }
        return;
    }

    // ===== EVENT API =====
    if (req.url === '/api/event' && req.method === 'GET') {
        const event = readJSON(EVENT_FILE, { active: false, messages: [] });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(event));
        return;
    }

    if (req.url === '/api/event/start' && req.method === 'POST') {
        const data = await readBody(req);
        if (data.password !== CONFIG.adminPassword) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Fel lösenord' }));
            return;
        }
        const event = { active: true, title: data.title || 'Event', type: data.type || 'live', messages: [], startedAt: new Date().toISOString() };
        writeJSON(EVENT_FILE, event);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    if (req.url === '/api/event/message' && req.method === 'POST') {
        const data = await readBody(req);
        if (data.password !== CONFIG.adminPassword) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Fel lösenord' }));
            return;
        }
        const event = readJSON(EVENT_FILE, { active: false, messages: [] });
        if (!event.active) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Inget aktivt event' }));
            return;
        }
        event.messages.push({
            text: (data.text || '').substring(0, 500),
            time: new Date().toISOString()
        });
        writeJSON(EVENT_FILE, event);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    if (req.url === '/api/event/stop' && req.method === 'POST') {
        const data = await readBody(req);
        if (data.password !== CONFIG.adminPassword) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Fel lösenord' }));
            return;
        }
        writeJSON(EVENT_FILE, { active: false, messages: [] });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    // Static file server
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('========================================');
    console.log('  BrawlHelper Beta');
    console.log('========================================');
    console.log(`  Lokal: http://localhost:${PORT}`);
    if (!API_KEY) {
        console.log('\n  OBS: Ingen BRAWL_API_KEY satt.');
    }

    // Starta localtunnel => brawlhelper.loca.lt
    try {
        const localtunnel = require('localtunnel');
        (async () => {
            try {
                const tunnel = await localtunnel({ port: PORT, subdomain: 'brawlhelper' });
                console.log('');
                console.log('  BETA LIVE:  ' + tunnel.url);
                console.log('  Skriv denna URL på valfri enhet!');
                console.log('');
                tunnel.on('close', () => {
                    console.log('  Tunnel stängd, startar om...');
                    process.exit(1);
                });
            } catch (e) {
                console.log('\n  Tunnel-fel:', e.message);
            }
        })();
    } catch (e) {
        console.log('\n  localtunnel saknas. Kör: npm install localtunnel');
    }
});
