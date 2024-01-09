/**
 * Detecta todos os funções na pasta /functions e adiciona nas configurações do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */


const fs = require('fs');
const GouHandler = require("../structures/GouHandler");
const path = require('path');

module.exports = class GouEventHandler extends GouHandler {
    constructor(client) {
        super(client);
        this.name = "Functions";
    }

    handler() {
        const functions = path.join(__dirname, "../functions");
        const functionsFiles = fs.readdirSync(functions).filter(file => file.endsWith(".js"));

        for (const functionFile of functionsFiles) {
            const functionClass = require(path.join(functions, functionFile));
            const _function = new functionClass(this.client)

            this.client.settings.functions.set(functionFile.split(".")[0], _function)
        }

        this.client.log(`[BOT] Registrado ${this.client.settings.functions.size} funções`, "cyan")
    }
}