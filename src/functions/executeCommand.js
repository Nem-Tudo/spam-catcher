/**
 * Executa um comando com base em uma mensagem
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouFunction = require('../structures/GouFunction');
const Discord = require("discord.js")

module.exports = class GouFunctionExecuteCommand extends GouFunction {
    constructor(client) {
        super(client);
    }

    /**
     * 
     * @param {Discord.Message} message 
     */
    async run(message, byEditedMessage = false) {
        if (!message || !message.author || message.author.bot || !message.content) return;
        if (!message.content.startsWith(this.client.config.prefix)) return;

        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = this.client.settings.commands.get(commandName) || this.client.settings.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command.disabled && !this.client.config.admins.includes(message.author.id)) return;
        if ((command.guildOnly || command.permission) && !message.guildId) return;
        if (command.adminsOnly && !this.client.config.admins.includes(message.author.id)) return;
        if (command.permission && !message.member.permissions.has(command.permission)) return;

        const clientdb = await this.client.settings.database.getClient();

        try {
            message.channel.sendTyping();
            const userdb = await this.client.settings.database.user(message.author.id);
            const guilddb = message.guild ? await this.client.settings.database.guild(message.guild.id) : null;

            await command.run(message, args, { user: userdb, guild: guilddb, client: clientdb });

            this.client.logMessage("🤖 Comando executado", `**Comando:**\n- Nome: **${command.name}**\n- Conteúdo: \`${args.join(" ")}\`\n- Por mensagem editada: ${byEditedMessage ? "Sim" : "Não"}\n- URL: [Clique](${message.url})\n\n**Usuário:**\n- <@${message.author.id}>\n- ID: \`${message.author.id}\`\n- Nome: \`${message.author.username}\``)

        } catch (error) {
            this.client.log(`Erro: ${error}`, "red")
            console.log(error)

            const embed = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Erro")
                .setDescription("Ocorreu um erro interno ao executar este comando.")

            return message.reply({ embeds: [embed] }).catch(() => { })
        }
    }
}