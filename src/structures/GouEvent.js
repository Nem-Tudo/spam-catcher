/**
 * Estrutura de um Evento.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */


const GouClient = require("../structures/GouClient");

module.exports = class GouEvent {
    /**
     * 
     * @param {GouClient} client 
     */
    constructor(client) {
        this.client = client

        //Evento no Discord
        this.event = null

        //Só pode ser executado uma vez?
        this.once = false;

        //Está desabilitado?
        this.disabled = false
    }

    execute(...args) {
        // Verifica se o Evento está desabilitado
        if (this.disabled) return;

        //Executa a funlção 'run' do Evento.
        this.run(...args)
    }
}
