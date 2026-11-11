<div align="center">

# 📲 Disparo WhatsApp

**Bot que envia a mesma mensagem para vários grupos do WhatsApp, na hora de iniciar e em horários agendados todos os dias.**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WhatsApp](https://img.shields.io/badge/whatsapp--web.js-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

</div>

---

## 💡 Sobre

Divulgar um anúncio recorrente (aluguel de quarto, vaga, serviço) em vários grupos de WhatsApp significa copiar e colar a mesma mensagem grupo por grupo, todo dia. Este bot conecta no WhatsApp Web, localiza os grupos pelo nome e dispara a mensagem configurada para todos eles, com pausas aleatórias entre envios, repetindo nos horários definidos.

## ✨ Funcionalidades

- **Envio para vários grupos** — lista de grupos-alvo por nome exato.
- **Agendamento diário** — horários em formato 24 h (ex.: `[9, 18]`) via `node-cron`.
- **Disparo inicial opcional** — envia assim que conecta (`sendOnStartup`).
- **Sessão persistente** — QR Code só na primeira vez (`LocalAuth`).
- **Reconexão automática** quando o WhatsApp desconecta.
- **Relatório de grupos** — mostra quais foram encontrados e sugere nomes parecidos para os que não foram.
- **Pausa anti-spam** de 5 a 8 s entre envios, com fallback de envio se o método principal falhar.

## 🖥️ Exemplo de execução

```text
$ npm start
🔐 Sessão autenticada com sucesso!
✅ WhatsApp conectado e pronto!

⏳ Aguardando 15s para sincronizar os chats...

[<data/hora>] 🚀 Disparo inicial imediato...
🔍 Buscando grupos...
📋 Chats: <n> | Grupos: <n>
✅ 2/3 grupos encontrados.

  ✔  "Meu Grupo 1"
  ✔  "Meu Grupo 2"
  ✖  "Meu Grupo 3" → similar: "Meu Grupo 03"

📤 Enviando → "Meu Grupo 1"...
   ✅ Confirmado!
...
[<data/hora>] 📊 Resultado: 2/2 mensagens enviadas.

🕒 Agendado para todos os dias às 9:00 e 18:00.
📌 Mantenha este terminal aberto para os envios continuarem.
```

## 🛠️ Tecnologias

- **Node.js 18+**
- **whatsapp-web.js** — controle do WhatsApp Web via Puppeteer
- **node-cron** — agendamento
- **qrcode-terminal** — QR Code de login no terminal

## 🚀 Como rodar

```bash
git clone https://github.com/KevinLopes23/disparo-whats.git
cd disparo-whats
npm install
```

Edite o `config.js`:

```js
module.exports = {
  groups: ['Meu Grupo 1', 'Meu Grupo 2'], // nomes EXATOS, com emojis
  message: `Sua mensagem aqui (*negrito*, _itálico_)`,
  schedule: [9, 18],      // horas do dia (24 h)
  sendOnStartup: true,    // dispara ao conectar
  syncDelayMs: 15000,     // espera a sincronização dos chats
};
```

```bash
npm start
```

Na primeira execução, escaneie o QR Code em **WhatsApp → Aparelhos conectados → Conectar um aparelho**. A sessão fica salva em `.wwebjs_auth/` (não compartilhe essa pasta). O bot só envia enquanto o processo estiver rodando.

| Problema | Solução |
|---|---|
| QR Code aparece toda vez | Apague `.wwebjs_auth/` e conecte de novo |
| Grupo não encontrado | Confira se o nome em `config.js` é idêntico ao do WhatsApp |
| Timeout do Puppeteer | Aumente `protocolTimeout` em `index.js` (padrão 5 min) |

## ⚠️ Aviso

Este projeto **não usa a API oficial** do WhatsApp: ele automatiza o WhatsApp Web, o que vai contra os Termos de Serviço e pode levar ao **banimento do número**. Envie apenas para grupos onde a divulgação é permitida, com moderação, e nunca para quem não pediu para receber.

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).

## 👤 Autor

Feito por [Kevin Lopes](https://github.com/KevinLopes23)
