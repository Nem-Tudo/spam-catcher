/**
 * Estrutura do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouClient = require("../structures/GouClient");
const Discord = require("discord.js")

module.exports = class GouButton {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        this.client = client

        //customId do Botão
        this.id = null;

        //Está desabilitado?
        this.disabled = false;
    }

    /**
     * 
     * @param {Discord.Interaction} interaction 
     * @param  {...any} args 
     */
    execute(interaction, ...args) {
        //Envia para as logs que um Botão foi pressionado
        this.client.logMessage("👉 Botão pressionado", `**Botão:**\n- ID: \`${interaction.customId}\`\n- Mensagem: \`${interaction.message?.id}\`\n- URL: [Clique](${interaction.message?.url})\n\n**Usuário:**\n- <@${interaction.user.id}>\n- ID: \`${interaction.user.id}\`\n- Nome: \`${interaction.user.username}\``)
        
        //Verifica se o Botão está desabilitado
        if (this.disabled) return interaction.reply({ content: "Este botão está temporariamente desabilitado.", ephemeral: true });
        
        //Executa a função 'run' do Botão
        this.run(interaction, ...args)
    }
}
