/**
 * Armaneza informações gerais do Client.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const mongoose = require('mongoose')

module.exports = (client) => {
    const Schema = new mongoose.Schema({
        // Data que o documento foi criado
        createdAt: {
            type: Date,
            immutable: true,
            default: () => new Date()
        },

        //Data da última vez que o documento foi atualizado
        updatedAt: {
            type: Date,
            default: () => new Date()
        }
    })

    //Atualiza automaticamente a data da última vez que o documento foi atualizado
    Schema.pre('save', function (next) {
        this.updatedAt = Date.now()
        next()
    })

    //Retorna os dados necessários
    const name = "Client";
    return {
        name: name,
        schema: mongoose.model(name, Schema)
    }
}
