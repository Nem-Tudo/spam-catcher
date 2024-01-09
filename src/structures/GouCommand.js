/**
 * Estrutura de um Comando (por mensagem)
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouClient = require("../structures/GouClient");

module.exports = class GouCommand {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        this.client = client

        //Nome principal do comando
        this.name = null;

        //Todos os nomes que também irão funcionar.
        this.aliases = [];

        //Descrição do comando
        this.description = null;

        //Permissão necessária para executar o comando.
        this.permission = null;

        //O comando só pode executar em servidores?
        this.guildOnly = true;

        //Dados extras do comando.
        this.flags = [];

        //O comando está desabilitado? (As verificações ficam em functions/executeCommand.js)
        this.disabled = false;

        //Apenas Administradores (informados no config.js) podem executar o comando?
        this.adminsOnly = false;
    }
}