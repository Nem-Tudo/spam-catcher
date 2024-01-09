/**
 * Estrutura de uma função
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouClient = require("../structures/GouClient");

module.exports = class GouFunction {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        this.client = client;
    }
}