/**
 * Estrutura das interações Modal.
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

        //customId do modal
        this.id = null;

        //Está desabilitado?
        this.disabled = false
    }

    /**
     * 
     * @param {Discord.Interaction} interaction 
     * @param  {...any} args 
     */
    execute(interaction, ...args) {
        // Envia para as logs que um Modal foi enviado.
        this.client.logMessage("📩 Modal enviado", `**Modal:**\n- ID: \`${interaction.customId}\`\n- Mensagem: \`${interaction.message?.id}\`\n- URL: [Clique](${interaction.message?.url})\n\n**Usuário:**\n- <@${interaction.user.id}>\n- ID: \`${interaction.user.id}\`\n- Nome: \`${interaction.user.username}\``)

        //Verifica se o Modal está desabilitado
        if (this.disabled) return interaction.reply({ content: "Este modal está temporariamente desabilitado.", ephemeral: true });
        
        //Executa a função 'run' do Modal
        this.run(interaction, ...args)
    }
}
