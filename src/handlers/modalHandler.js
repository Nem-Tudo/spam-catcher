/**
 * Detecta todos os modais na pasta /interactions/modal e adiciona nas configurações do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const fs = require('fs');
const GouHandler = require("../structures/GouHandler");
const path = require('path');

module.exports = class GouModalHandler extends GouHandler {
    constructor(client) {
        super(client);
        this.name = "Modals";
    }

    handler() {
        const modalsPath = path.join(__dirname, "../interactions/modals");
        const modalsFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith(".js"));

        for (const modalFile of modalsFiles) {
            const filePath = path.join(modalsPath, modalFile);
            const modalClass = require(filePath);
            const modal = new modalClass(this.client)

            this.client.settings.modals.set(modal.id, modal)
        }

        this.client.log(`[BOT] Registrado ${this.client.settings.modals.size} modais`, "cyan")
    }
}