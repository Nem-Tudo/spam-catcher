/**
 * Comando PERIGOSO para Admins, executa um código Javascript direto de uma mensagem do Discord.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouCommand = require('../../structures/GouCommand');
const Discord = require("discord.js")
const util = require("util")

module.exports = class GouCommandEval extends GouCommand {
    constructor(client) {
        super(client);

        this.name = "help";
        this.aliases = ["ajuda", "comandos", "commands"];
        this.adminsOnly = false;
        this.guildOnly = false;
    }

    async run(message, args) {
        message.reply(`> - \`${this.client.config.prefix}detectspam\`: Comando de configuração`)
    }
}