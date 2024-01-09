/**
 * Ao receber uma mensagem, tenta executar um comando.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouEvent = require('../structures/GouEvent');
const Discord = require("discord.js")

module.exports = class GouEventReady extends GouEvent {
    constructor(client) {
        super(client);
        this.event = Discord.Events.MessageCreate;

    }

    run(message) {
        this.client.settings.functions.get("executeCommand").run(message, false)
    }
}