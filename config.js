// ─────────────────────────────────────────────
// Configuração do Disparo WhatsApp
// Edite este arquivo para personalizar o bot.
// ─────────────────────────────────────────────

module.exports = {
    /**
     * Lista de nomes EXATOS dos grupos-alvo.
     * O nome precisa ser idêntico ao que aparece no seu WhatsApp.
     */
    groups: [
        'Grupo Exemplo 1',
        'Grupo Exemplo 2'
    ],

    /**
     * Mensagem que será enviada nos grupos.
     * Use *texto* para negrito e _texto_ para itálico.
     */
    message: `*Vaga masculina  Quarto duplo – Centro de Dublin*
📍 Localização: Rua Exemplo, nº 000 – Centro

Entrada 13/09
Aluguel 625€ + depósito 

O quarte tem 2 camas de casal 
- 1 cama disponível (não dividi cama)
Apartamento bem localizado, confortável e completo, ideal para quem busca morar no centro.

Excelente localização, com fácil acesso a transporte, mercados e comércio.

🏠 Sobre o imóvel:
\t•\tApartamento com 2 quartos
\t•\t2 pessoas por quarto
\t•\t4 pessoas no total
\t•\tPrédio com elevador
\t•\tVaranda
\t•\tGaragem para bicicleta

🍽️ Casa equipada com:
\t•\tGeladeira
\t•\tLava e seca
\t•\tCozinha completa

✔️ Ambiente organizado e bem localizado
✔️ Ótima opção para quem trabalha ou estuda no centro

Seu Nome  +55 00 00000-0000`,

    /**
     * Horários de envio automático (formato 24h).
     * Exemplo: [9, 18] → envia às 09:00 e 18:00
     */
    schedule: [9, 18],

    /**
     * Se true, envia as mensagens imediatamente ao iniciar o script.
     */
    sendOnStartup: true,

    /**
     * Tempo de espera (ms) para o WhatsApp Web sincronizar antes do primeiro envio.
     */
    syncDelayMs: 15000,
};
