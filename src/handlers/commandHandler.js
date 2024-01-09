/**
 * Detecta todos os comandos na pasta /commands e adiciona nas configurações do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const fs = require('fs');
const GouHandler = require("../structures/GouHandler");
const path = require('path');

module.exports = class GouCommandHandler extends GouHandler {
    constructor(client) {
        super(client);
        this.name = "Commands";
    }

    handler() {
        const commandsCategoriesPath = fs.readdirSync(path.join(__dirname, "../commands"))

        for (const categoriePath of commandsCategoriesPath) {

            const commandsPath = path.join(__dirname, `../commands/${categoriePath}`);

            const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

            for (const commandFile of commandsFiles) {
                const filePath = path.join(commandsPath, commandFile);
                const commandClass = require(filePath);
                const command = new commandClass(this.client)

                this.client.settings.commands.set(commandFile.split(".")[0], command)
            }

        }

        this.client.log(`[BOT] Registrado ${this.client.settings.commands.size} commandos em ${commandsCategoriesPath.length} categorias`, "cyan")

    }
}