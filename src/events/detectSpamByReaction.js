/**
 * Detecta o spam por reação
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouEvent = require('../structures/GouEvent');
const Discord = require("discord.js");

module.exports = class GouEventDetectSpamByReaction extends GouEvent {
    constructor(client) {
        super(client);
        this.event = Discord.Events.MessageReactionAdd;
    }

    /**
     * @param {Discord.MessageReaction} reaction
     * @param {Discord.User} user
     */
    async run(reaction, user) {
        // Resolve parciais
        if (reaction.partial) {
            try { await reaction.fetch(); }
            catch (e) { return console.error("[detectSpamByReaction] Falha ao fetch da reação:", e); }
        }

        if (reaction.message.partial) {
            try { await reaction.message.fetch(); }
            catch (e) { return console.error("[detectSpamByReaction] Falha ao fetch da mensagem:", e); }
        }

        const message = reaction.message;

        if (!message.guild?.id) return;
        if (user.bot) return;

        const guilddb = await this.client.settings.database.guild(message.guild.id);

        if (!guilddb.settings.spamCatcher.enabled) return;
        if (guilddb.settings.spamCatcher.channel !== message.channel.id) return;

        const member = await message.guild.members.fetch(user.id).catch(() => null);
        if (!member) return;

        if (member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;

        const logsChannel = guilddb.settings.spamCatcher.logsChannel
            ? message.guild.channels.cache.get(guilddb.settings.spamCatcher.logsChannel)
            : null;

        if (guilddb.settings.spamCatcher.punishment === "KICK") {
            await member.kick("Reaction spam detected. Punishment: kick").catch((e) => {
                logsChannel?.send(`> ❌ **ERROR ON KICK MEMBER**: <@${member.id}> (\`${member.id}\`) \`${e}\``);
            });
        }

        if (guilddb.settings.spamCatcher.punishment === "BAN") {
            await member.ban({ reason: "Reaction spam detected. Punishment: ban" }).catch((e) => {
                logsChannel?.send(`> ❌ **ERROR ON BAN MEMBER**: <@${member.id}> (\`${member.id}\`) \`${e}\``);
            });
        }

        if (guilddb.settings.spamCatcher.punishment === "SOFTBAN") {
            const id = member.id;
            await member.ban({ reason: "Reaction spam detected. Punishment: softban", deleteMessageSeconds: 60 * 30 }).catch((e) => {
                logsChannel?.send(`> ❌ **ERROR ON SOFTBAN MEMBER**: <@${member.id}> (\`${member.id}\`) \`${e}\``);
            });
            setTimeout(() => {
                await message.guild.members.unban(id, "softban").catch(() => { });
            }, 20 * 1000)
        }

        if (logsChannel) {
            logsChannel.send(
                `> (Reaction) **${guilddb.settings.spamCatcher.punishment}** <@${member.id}> (\`${member.id}\`): [Message URL](${message.url}) (${reaction.emoji})`
            );
        }
    }
};