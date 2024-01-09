/**
 * Detecta todos as funções na pasta /events e adiciona nas configurações do Client
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
        this.name = "Events";
    }

    handler() {
        const eventsPath = path.join(__dirname, "../events");
        const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

        for (const eventFile of eventsFiles) {
            const filePath = path.join(eventsPath, eventFile);
            const eventClass = require(filePath);
            const event = new eventClass(this.client)

            this.client[event.once ? "once" : "on"](event.event, (...args) => event.execute(...args));

            this.client.settings.events.set(eventFile.split(".")[0], event)
        }

        this.client.log(`[BOT] Registrado ${this.client.settings.events.size} eventos`, "cyan")
    }
}