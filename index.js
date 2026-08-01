const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const config = require('./config');

// ─────────────────────────────────────────────
// Inicialização do Client
// ─────────────────────────────────────────────
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
        protocolTimeout: 300000,
    },
});

// ─────────────────────────────────────────────
// Eventos do WhatsApp
// ─────────────────────────────────────────────
client.on('qr', (qr) => {
    console.log('\n┌──────────────────────────────────────────────┐');
    console.log('│  Escaneie o QR Code abaixo com seu WhatsApp  │');
    console.log('└──────────────────────────────────────────────┘\n');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('🔐 Sessão autenticada com sucesso!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação:', msg);
    console.log('💡 Tente deletar a pasta .wwebjs_auth e rodar novamente.');
});

client.on('disconnected', (reason) => {
    console.log('🔌 Desconectado:', reason);
    console.log('🔄 Tentando reconectar...');
    client.initialize();
});

client.on('ready', async () => {
    console.log('✅ WhatsApp conectado e pronto!\n');

    // Aguarda sincronização dos chats
    const syncDelay = config.syncDelayMs / 1000;
    console.log(`⏳ Aguardando ${syncDelay}s para sincronizar os chats...`);
    await sleep(config.syncDelayMs);

    // Disparo imediato ao iniciar
    if (config.sendOnStartup) {
        console.log(`\n[${timestamp()}] 🚀 Disparo inicial imediato...`);
        await sendMessages();
    }

    // Agendamento automático
    const schedule = config.schedule.join(',');
    cron.schedule(`0 ${schedule} * * *`, async () => {
        console.log(`\n[${timestamp()}] 🕒 Disparo agendado...`);
        await sendMessages();
    });

    console.log(`\n🕒 Agendado para todos os dias às ${config.schedule.map(h => `${h}:00`).join(' e ')}.`);
    console.log('📌 Mantenha este terminal aberto para os envios continuarem.\n');
});

// ─────────────────────────────────────────────
// Lógica de envio
// ─────────────────────────────────────────────
async function sendMessages() {
    try {
        console.log('🔍 Buscando grupos...');

        const result = await client.pupPage.evaluate(() => {
            const chats = window.require('WAWebCollections').Chat.getModelsArray();
            const groups = chats.filter(c => {
                try { return c.id && c.id.server === 'g.us'; }
                catch { return false; }
            });
            return {
                total: chats.length,
                groups: groups.map(c => {
                    let id;
                    try { id = c.id._serialized; } catch {}
                    if (!id) try { id = c.id.$1; } catch {}
                    if (!id) try { id = `${c.id.user}@${c.id.server}`; } catch {}
                    return { id: id || 'unknown', name: c.name || c.formattedTitle || '' };
                }),
            };
        });

        console.log(`📋 Chats: ${result.total} | Grupos: ${result.groups.length}`);

        const matched = result.groups.filter(g => config.groups.includes(g.name));
        console.log(`✅ ${matched.length}/${config.groups.length} grupos encontrados.\n`);

        // Relatório de cada grupo alvo
        for (const name of config.groups) {
            const found = matched.find(g => g.name === name);
            if (found) {
                console.log(`  ✔  "${name}"`);
            } else {
                const kw = name.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                const similar = result.groups
                    .filter(g => kw.some(k => g.name.toLowerCase().includes(k)))
                    .slice(0, 2);
                console.log(`  ✖  "${name}"${similar.length ? ' → similar: ' + similar.map(s => `"${s.name}"`).join(', ') : ''}`);
            }
        }

        // Envio
        let sent = 0;
        for (const group of matched) {
            try {
                console.log(`\n📤 Enviando → "${group.name}"...`);

                const ok = await client.pupPage.evaluate(async (chatId, msg) => {
                    try {
                        const chat = await window.require('WAWebCollections').Chat.find(chatId);
                        if (!chat) return false;
                        await chat.sendMessage(msg);
                        return true;
                    } catch { return false; }
                }, group.id, config.message);

                if (ok) {
                    console.log(`   ✅ Confirmado!`);
                    sent++;
                } else {
                    console.log(`   ⚠️  Store falhou, tentando fallback...`);
                    try {
                        await client.sendMessage(group.id, config.message);
                        console.log(`   ✅ Fallback OK!`);
                        sent++;
                    } catch (e) {
                        console.error(`   ❌ Falhou: ${e.message}`);
                    }
                }

                // Pausa anti-spam (5–8s)
                const pause = Math.floor(Math.random() * 3000) + 5000;
                await sleep(pause);
            } catch (err) {
                console.error(`   ❌ Erro: ${err.message}`);
            }
        }

        console.log(`\n[${timestamp()}] 📊 Resultado: ${sent}/${matched.length} mensagens enviadas.`);
    } catch (error) {
        console.error('❌ Erro na rotina de envio:', error.message);
    }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timestamp() {
    return new Date().toLocaleString('pt-BR');
}

// ─────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────
client.initialize();
