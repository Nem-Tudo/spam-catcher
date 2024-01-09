/**
 * Estrutura das configurações do Client
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

//Importa todas as estruturas envolvendo o Client
const GouClient = require("../structures/GouClient");
const GouCommand = require("../structures/GouCommand");
const GouEvent = require("../structures/GouEvent");
const GouFunction = require("../structures/GouFunction");
const GouButton = require("../structures/GouButton");
const GouModal = require("../structures/GouModal");

//Importa as coleções especiais do Discord
const { Collection } = require('discord.js');


module.exports = class Settings {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        //Cria as coleções de comandos, eventos, funções, botões, modais e banco de dados.

        /**
         * Representa uma coleção de comandos.
         * @type {Collection<string, GouCommand>}
         */
        this.commands = new Collection();
        /**
         * Representa uma coleção de comandos.
         * @type {Collection<string, GouEvent>}
         */
        this.events = new Collection();
        /**
         * Representa uma coleção de comandos.
         * @type {Collection<string, GouFunction>}
         */
        this.functions = new Collection();

        /**
         * Representa uma coleção de comandos.
         * @type {Collection<string, GouButton>}
         */
        this.buttons = new Collection();

        /**
         * Representa uma coleção de comandos.
         * @type {Collection<string, GouModal>}
         */
        this.modals = new Collection();

        //Registra o banco de dados
        this.database = require('../database/index')(client);

    }
}