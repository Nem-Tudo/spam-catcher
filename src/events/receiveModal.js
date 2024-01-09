/**
 * Ao detectar o evento InteractionCreate, verifica se é um Modal e se ele está configurado. Se estiver, executa.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouEvent = require('../structures/GouEvent');
const Discord = require("discord.js")

module.exports = class GouEventModal extends GouEvent {
    constructor(client) {
        super(client);
        this.event = Discord.Events.InteractionCreate;

    }

    /**
     * 
     * @param {Discord.Interaction} interaction 
     */
    run(interaction) {
        if (!interaction.isModalSubmit()) return;

        const modalId = interaction.customId;

        const modal = this.client.settings.modals.get(modalId);
        if (!modal) return;

        modal.execute(interaction)
    }
}