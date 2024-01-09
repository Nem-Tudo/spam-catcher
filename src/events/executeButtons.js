/**
 * Ao detectar o evento InteractionCreate, verifica se é um Botão e se ele está configurado. Se estiver, executa.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouEvent = require('../structures/GouEvent');
const Discord = require("discord.js")

module.exports = class GouEventButton extends GouEvent {
    constructor(client) {
        super(client);
        this.event = Discord.Events.InteractionCreate;

    }

    /**
     * 
     * @param {Discord.Interaction} interaction 
     */
    run(interaction) {
        if(!interaction.isButton()) return;

        const buttonId = interaction.customId;

        const button = this.client.settings.buttons.get(buttonId);
        if(!button) return;

        button.execute(interaction)
    }
}