/**
 * Estrutura básisa dos Handlers.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouClient = require("../structures/GouClient");

module.exports = class GouHandler {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        this.client = client;

        //Nome do handler
        this.name = null;
    }
}