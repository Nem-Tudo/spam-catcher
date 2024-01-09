/**
 * Simplesmente executado quando o Bot liga.
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

        this.event = Discord.Events.ClientReady;
        this.once = true;
    }

    run() {
        this.client.log("[BOT] O bot está operacional.", "cyan")
    }
}