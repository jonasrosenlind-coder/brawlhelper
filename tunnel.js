const localtunnel = require('localtunnel');

(async () => {
    const tunnel = await localtunnel({ port: 3000, subdomain: 'brawlhelper' });
    console.log('Tunnel running at:', tunnel.url);
    tunnel.on('close', () => {
        console.log('Tunnel closed, restarting...');
        process.exit(1);
    });
})();
