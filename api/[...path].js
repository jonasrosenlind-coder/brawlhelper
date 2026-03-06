const https = require('https');

function proxyBrawlApi(apiPath, res) {
    const API_KEY = process.env.BRAWL_API_KEY || '';

    if (!API_KEY) {
        res.status(500).json({ error: 'API key not configured on server' });
        return;
    }

    const url = `https://api.brawlstars.com/v1/${apiPath}`;

    https.get(url, { headers: { Authorization: `Bearer ${API_KEY}` } }, (apiRes) => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.status(apiRes.statusCode).end(data);
        });
    }).on('error', (err) => {
        res.status(500).json({ error: 'Failed to reach Brawl Stars API', details: err.message });
    });
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const pathParts = req.query.path || [];
    const fullPath = pathParts.join('/');

    // /api/player/TAG
    if (pathParts[0] === 'player' && pathParts.length >= 2) {
        const tag = pathParts.slice(1).join('/');
        proxyBrawlApi(`players/${tag}`, res);
        return;
    }

    // /api/clubs/search?name=...
    if (fullPath === 'clubs/search') {
        const { name, minTrophies, minMembers, maxMembers, type } = req.query;
        let apiPath = `clubs?name=${encodeURIComponent(name || '')}&limit=50`;
        if (parseInt(minTrophies) > 0) apiPath += `&minTrophies=${minTrophies}`;
        if (parseInt(minMembers) > 0) apiPath += `&minMembers=${minMembers}`;
        if (parseInt(maxMembers) < 100) apiPath += `&maxMembers=${maxMembers}`;
        if (type) apiPath += `&type=${type}`;
        proxyBrawlApi(apiPath, res);
        return;
    }

    // /api/clubs/rankings
    if (fullPath === 'clubs/rankings') {
        proxyBrawlApi('rankings/global/clubs?limit=200', res);
        return;
    }

    // /api/clubs/TAG
    if (pathParts[0] === 'clubs' && pathParts.length >= 2) {
        const tag = pathParts.slice(1).join('/');
        proxyBrawlApi(`clubs/${tag}`, res);
        return;
    }

    // /api/rankings/players?country=global
    if (fullPath === 'rankings/players') {
        const country = req.query.country || 'global';
        proxyBrawlApi(`rankings/${encodeURIComponent(country)}/players?limit=200`, res);
        return;
    }

    // /api/rankings/clubs?country=global
    if (fullPath === 'rankings/clubs') {
        const country = req.query.country || 'global';
        proxyBrawlApi(`rankings/${encodeURIComponent(country)}/clubs?limit=200`, res);
        return;
    }

    // /api/rankings/brawlers?brawlerId=...&country=global
    if (fullPath === 'rankings/brawlers') {
        const country = req.query.country || 'global';
        const brawlerId = req.query.brawlerId || '';
        if (!brawlerId) {
            res.status(400).json({ error: 'brawlerId required' });
            return;
        }
        proxyBrawlApi(`rankings/${encodeURIComponent(country)}/brawlers/${encodeURIComponent(brawlerId)}?limit=200`, res);
        return;
    }

    // /api/rankings/prestige?country=global
    if (fullPath === 'rankings/prestige') {
        const country = req.query.country || 'global';
        proxyBrawlApi(`rankings/${encodeURIComponent(country)}/powerplay/players?limit=200`, res);
        return;
    }

    res.status(404).json({ error: 'Unknown API endpoint' });
};
