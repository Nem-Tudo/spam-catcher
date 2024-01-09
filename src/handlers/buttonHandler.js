/**
 * Detecta todos os botões na pasta /buttons e adiciona nas configurações do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */


const fs = require('fs');
const GouHandler = require("../structures/GouHandler");
const path = require('path');

module.exports = class GouButtonHandler extends GouHandler {
    constructor(client) {
        super(client);
        this.name = "Buttons";
    }

    handler() {
        const buttonsPath = path.join(__dirname, "../interactions/buttons");
        const buttonsFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith(".js"));

        for (const buttonFile of buttonsFiles) {
            const filePath = path.join(buttonsPath, buttonFile);
            const buttonClass = require(filePath);
            const button = new buttonClass(this.client)

            this.client.settings.buttons.set(button.id, button)
        }

        this.client.log(`[BOT] Registrado ${this.client.settings.buttons.size} botões`, "cyan")
    }
}