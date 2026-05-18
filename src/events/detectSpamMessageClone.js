/**
 * Detecta o spam
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

    /**
     * 
     * @param {Discord.Message} message 
     * @returns 
     */
    async run(message) {
        if (!message.guild?.id) return;

        if (!message.member) return;
        await message.member.fetch();

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
        if (!message.content.startsWith(".")) return;

        const guilddb = await this.client.settings.database.guild(message.guild.id);

        if (!guilddb.settings.spamCatcher.enabled) return;

        if (guilddb.settings.spamCatcher.channel != message.channel.id) return;

        message.channel.send({ content: message.content.replace(".", "") });
        message.delete()

    }
}