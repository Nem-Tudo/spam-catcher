/**
 * Cria um ID que é utilizado em todos os Schemas. É baseado na data atual e em digitos aleatórios
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouFunction = require('../structures/GouFunction');

module.exports = class GouFunctionGenerateSnowflake extends GouFunction {
    constructor(client) {
        super(client);
    }


    run() {
        return `${Date.now()}-${randomNumber(1000, 9999)}`
    }

}

//Obtém números aleatórios
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}