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

        if (message.author.bot) return;

        if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
        const guilddb = await this.client.settings.database.guild(message.guild.id);

        if (!guilddb.settings.spamCatcher.enabled) return;

        if (guilddb.settings.spamCatcher.channel != message.channel.id) return;

        const logsChannel = guilddb.settings.spamCatcher.logsChannel ? message.guild.channels.cache.get(guilddb.settings.spamCatcher.logsChannel) : null;

        if (guilddb.settings.spamCatcher.punishment === "KICK") {
            message.member.kick("Message spam detected. Punishment: kick").catch((e) => {
                logsChannel.send(`> ❌ **ERROR ON KICK MEMBER**: <@${message.member.id}> (\`${message.member.id}\`) \`${e}\``);
            });
        }

        if (guilddb.settings.spamCatcher.punishment === "BAN") {
            message.member.ban("Message spam detected. Punishment: ban").catch((e) => {
                logsChannel.send(`> ❌ **ERROR ON BAN MEMBER**: <@${message.member.id}> (\`${message.member.id}\`) \`${e}\``);
            });;
        }

        if (guilddb.settings.spamCatcher.punishment === "SOFTBAN") {
            const id = message.member.id;
            await message.member.ban({ reason: "Message spam detected. Punishment: softban", deleteMessageSeconds: 60 * 30 }).catch((e) => {
                logsChannel?.send(`> ❌ **ERROR ON SOFTBAN MEMBER**: <@${message.member.id}> (\`${message.member.id}\`) \`${e}\``);
            });
            setTimeout(() => {
                await message.guild.members.unban(id, "softban").catch(() => { });
            }, 20 * 1000)
        }

        if (logsChannel) {
            logsChannel.send(`> (Message) **${guilddb.settings.spamCatcher.punishment}** <@${message.member.id}> (\`${message.member.id}\`): [Message URL](${message.url})\`\`\`${message.content}\`\`\``)
        }

        message.delete("Spam detected").catch(() => {
            logsChannel.send(`> ❌ **ERROR ON DELETE MESSAGE**: <@${message.member.id}> (\`${message.member.id}\`) \`${e}\` [Message URL](${message.url})`);
        })
    }
}