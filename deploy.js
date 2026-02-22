const { Client } = require('ssh2');

const conn = new Client();

const PROJECT_PATH = '/root/perfumeria/perfumeria-main/Perfumeria/frontend';

const commands = [
    `cd ${PROJECT_PATH} && npm install --legacy-peer-deps && npm run build`,
    `pm2 restart all`,
];

function runCommand(conn, cmd) {
    return new Promise((resolve, reject) => {
        conn.exec(cmd, (err, stream) => {
            if (err) return reject(err);
            let output = '';
            stream.on('data', (data) => { output += data; });
            stream.stderr.on('data', (data) => { output += data; });
            stream.on('close', () => resolve(output));
        });
    });
}

conn.on('ready', async () => {
    console.log('✅ Conectado al servidor!');

    try {
        for (const cmd of commands) {
            console.log('\n▶ Ejecutando:', cmd);
            const out = await runCommand(conn, cmd);
            console.log(out);
        }
        console.log('\n🚀 Build y deploy completados!');
    } catch (e) {
        console.error('Error:', e);
    }

    conn.end();
});

conn.on('error', (err) => {
    console.error('❌ Error de conexión:', err.message);
});

conn.connect({
    host: '66.97.36.125',
    port: 22,
    username: 'root',
    password: 'Valentin//2005',
    readyTimeout: 15000,
});
