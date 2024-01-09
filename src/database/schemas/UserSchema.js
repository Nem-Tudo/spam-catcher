/**
 * Salva configurações dos Usuários.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const mongoose = require('mongoose');

module.exports = (client) => {
    const Schema = new mongoose.Schema({
        //Discord ID do usuário
        id: {
            type: String,
            unique: true,
            required: true
        },

        //Data que o documento foi criado
        createdAt: {
            type: Date,
            immutable: true,
            default: () => new Date()
        },

        // Data da última vez que o documento foi atualizado
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
    const name = "User";
    return {
        name: name,
        schema: mongoose.model(name, Schema)
    }
}
