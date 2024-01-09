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

        this.name = "eval";
        this.aliases = ["ev"];
        this.adminsOnly = true;
        this.guildOnly = false;
    }

    async run(message, args) {
        const guild = message.guild;
        const channel = message.channel;
        const user = message.author;
        try {
            const response = !args.join(' ').includes('--silent')
            const depth = args.join(' ').includes('--depth') ? 10 : 0;
            const texteval = String(args.join(" ")).replace('--silent', '').replace('--depth', '').replace('--async', '')
            let res = undefined;

            if (args.join(' ').includes('--async')) {
                res = await eval(`(async () => { ${texteval} })()`)

            } else {
                res = await eval(texteval)
            }

            let def = typeof (res);
            res = util.inspect(res, { depth: depth })

            if (!res || res == 'undefined') {
                res = "Nenhum retorno";
            }

            res = res.replace(new RegExp(this.client.token, 'gi'), '「ｓｅｃｒｅｔ」')

            if (res.length < 3500) {
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Eval')
                    .setDescription('**Retorno:**```js\n' + res + '```\n**Definição:** ```js\n' + def + '```')
                    .setColor('#00ff00')
                if (response) message.reply({ embeds: [embed] }).catch(() => { })

            } else {
                const evaltext = new Discord.AttachmentBuilder(Buffer.from(res), {name: "eval.js"})
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Retorno')
                    .setDescription('O retorno foi muito longo. Foi enviado um arquivo de texto.')
                    .setColor('#ff0000')

                if (response) message.reply({
                    files: [evaltext],
                    embeds: [embed]
                }).catch(() => { });
            }
        } catch (error) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('Erro')
                .setDescription('```js\n' + error + '```')
                .setColor('#ff0000')
            message.reply({ embeds: [embed] }).catch(() => { })
        }
    }
}