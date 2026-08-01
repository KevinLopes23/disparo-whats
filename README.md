# 📲 Disparo WhatsApp

Bot para envio automático e agendado de mensagens em grupos do WhatsApp.

Ideal para divulgação de imóveis, vagas ou anúncios recorrentes em múltiplos grupos de uma só vez.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/WhatsApp-Bot-25D366?logo=whatsapp&logoColor=white" />
  <img src="https://img.shields.io/badge/Agendamento-Cron-blue?logo=clockify&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 📨 **Disparo em massa** | Envia para múltiplos grupos automaticamente |
| 🕒 **Agendamento** | Configura horários de envio diário com cron |
| 🚀 **Disparo inicial** | Envia imediatamente ao iniciar o script |
| 🔐 **Sessão persistente** | Escaneia o QR Code apenas na primeira vez |
| 🔄 **Reconexão automática** | Reconecta sozinho se a conexão cair |
| 🧠 **Busca inteligente** | Sugere nomes similares caso não encontre um grupo |
| ⏱️ **Anti-spam** | Pausa aleatória entre envios (5–8s) |

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Uma conta de WhatsApp ativa
- Navegador Chromium (instalado automaticamente pelo Puppeteer)

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/KevinLopes23/disparo-whats.git
cd disparo-whats

# Instale as dependências
npm install
```

---

## ⚙️ Configuração

Edite o arquivo **`config.js`** para personalizar:

```js
module.exports = {
    // Nomes EXATOS dos grupos (como aparecem no WhatsApp)
    groups: [
        'Meu Grupo 1',
        'Meu Grupo 2',
    ],

    // Mensagem a ser enviada (use *negrito* e _itálico_)
    message: `Sua mensagem aqui...`,

    // Horários de envio (formato 24h)
    schedule: [9, 18],         // 09:00 e 18:00

    // Enviar imediatamente ao iniciar?
    sendOnStartup: true,

    // Delay de sincronização (ms)
    syncDelayMs: 15000,
};
```

> **💡 Dica:** O nome do grupo precisa ser **exatamente** igual ao que aparece no seu WhatsApp, incluindo emojis e caracteres especiais.

---

## ▶️ Como Usar

```bash
npm start
```

### Primeiro uso

1. Um **QR Code** aparecerá no terminal.
2. Abra o WhatsApp no celular → **Aparelhos Conectados** → **Conectar um aparelho**.
3. Escaneie o QR Code.
4. Pronto! O bot começará a enviar.

### Próximas vezes

A sessão é salva automaticamente. Basta rodar `npm start` e o bot conecta direto, sem QR Code.

---

## 📁 Estrutura do Projeto

```
disparo-whats/
├── index.js          # Lógica principal do bot
├── config.js         # Configuração (grupos, mensagem, horários)
├── package.json      # Dependências e scripts
├── .gitignore        # Arquivos ignorados pelo Git
└── README.md         # Documentação
```

---

## 🛠️ Tecnologias

| Pacote | Função |
|---|---|
| [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) | Controle do WhatsApp Web via Puppeteer |
| [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal) | Exibição do QR Code no terminal |
| [`node-cron`](https://www.npmjs.com/package/node-cron) | Agendamento de tarefas (cron jobs) |

---

## ⚠️ Avisos Importantes

- **Não é uma API oficial.** Este bot simula o WhatsApp Web. Use com responsabilidade.
- **Risco de banimento.** O envio excessivo de mensagens pode resultar em bloqueio da conta pelo WhatsApp. O bot já inclui pausas anti-spam, mas use com moderação.
- **Mantenha o terminal aberto.** O bot só funciona enquanto o processo estiver rodando.
- **Não compartilhe** a pasta `.wwebjs_auth/` — ela contém sua sessão do WhatsApp.

---

## 🐛 Solução de Problemas

| Problema | Solução |
|---|---|
| QR Code aparece repetidamente | Delete a pasta `.wwebjs_auth/` e tente novamente |
| Grupo não encontrado | Verifique se o nome no `config.js` é **exatamente** igual ao do WhatsApp |
| Erro `r: r` no getChats | Bug conhecido da lib — o bot já usa acesso direto ao store para evitar isso |
| Timeout do Puppeteer | O bot já configura 5min de timeout. Se persistir, aumente `protocolTimeout` no `index.js` |

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<p align="center">
  Feito com ☕ e Node.js
</p>
