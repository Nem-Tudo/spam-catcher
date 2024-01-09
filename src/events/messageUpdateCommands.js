/**
 * Ao detectar o evento MessageUpdate, verifica se os conteúdos são diferentes (fixações também são consideradas MessageUpdate), se for, tenta encontrar um comando.
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
        this.event = Discord.Events.MessageUpdate;

    }

    run(oldMessage, newMessage) {
        if (oldMessage.content != newMessage.content) this.client.settings.functions.get("executeCommand").run(newMessage, true)
    }
}