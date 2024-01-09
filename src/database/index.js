/**
 * Importa, carrega e registra todos os Schemas do banco de dados.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

//Importa a estrutura de schemas
const GouDatabase = require('../structures/GouDatabase')

// Importa todos os schemas
const ClientSchema = require('./schemas/ClientSchema')
const GuildSchema = require('./schemas/GuildSchema')
const UserSchema = require('./schemas/UserSchema')

module.exports = (client) => {
    const schemas = [ClientSchema(client), GuildSchema(client), UserSchema(client)];

    client.log(`[DATABASE] Registrado ${schemas.length} schemas`, "magenta")
    return new GouDatabase(client, process.env.MONGO_URI, schemas)
}
