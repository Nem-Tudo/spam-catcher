/**
 * Estrutura do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

//Importa a biblioteca do Discord
const Discord = require("discord.js");

//importa o Client 
const { Client } = require('discord.js')

//Importa a classe de configurações
const GouClientSettings = require("./GouClientSettings");

//Importa o arquivo de cores do Console
const colors = require("../../colors.json");


module.exports = class GouClient extends Client {
    constructor(options) {
        super(options)

        //Define se o estado atual é de testes
        this.canary = false //A alteração deve ser feita manualmente

        //Define o arquivo de configurações, com base no estado
        this.config = this.canary ? require('../../canary.config.js') : require('../../config.js')

        //Define a variável de configurações
        this.settings = new GouClientSettings(this);

        //Define as cores
        this.colors = colors;
    }

    //Função de informação no Console
    log(text, color) {
        //Faz o mesmo que console.log, porém com cores.
        process.stdout.write(`${colors[color]}${text}${colors.Reset}\n`)
    }

    //Inicializa o Client
    async login(token) {
        await super.login(token)

        //Mensagem de inicialização
        this.log('[BOT] Bot inicializado com sucesso.', 'cyan')
    }

    //Envia mensagem do canal de logs.
    async logMessage(title, description, color = "#f5bf42") {
        //Pega o canal pelo mainGuild.
        const channel = this.guilds.cache.get(this.config.mainGuild).channels.cache.get(this.config.logChannel) || await this.guilds.cache.get(this.config.mainGuild).channels.fetch(this.config.logChannel).catch(() => { });

        //Se o canal não for encontrado, retorne com uma mensagem no console.
        if (!channel) return this.log("Ocorreu um erro ao obter o canal de logs.", "red");

        //cria o Embed
        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

        //Envia no canal
        channel.send({ embeds: [embed] }).catch(() => { })

    }


    //Envia mensagem no canal de Registros
    async registerMessage(title, description, color = "#f5bf42", attachments = []) {
        //Pega o canal pelo mainGuild.
        const channel = this.guilds.cache.get(this.config.mainGuild).channels.cache.get(this.config.registerChannel) || await this.guilds.cache.get(this.config.mainGuild).channels.fetch(this.config.registerChannel).catch(() => { });

        //Se o canal não for encontrado, retorne com uma mensagem no console.
        if (!channel) return this.log("Ocorreu um erro ao obter o canal de registros.", "red");

        //cria o Embed
        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

        //Envia no canal
        channel.send({ embeds: [embed], files: attachments }).catch(() => { })

    }
}
