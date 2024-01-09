/**
 * Estrutura do Banco de Dados
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

// Importa a biblioteca do banco de dados
const mongoose = require('mongoose');

module.exports = class GouDatabase {
    constructor(client, uri, schemas) {
        //Se conecta ao banco de dados
        mongoose.connect(uri).then(() => {
            client.log("[DATABASE] Conectado com sucesso no banco de dados!", "magenta")
        }).catch(() => {
            client.log("[DATABASE] Ocorreu um erro ao se conectar com o banco de dados", "red")
        })

        //Cria um Mapa com schemas
        /**
         * @type {Map<string, mongoose.Model>}
         */
        const schemasMap = new Map()

        for (const schema of schemas) {
            schemasMap.set(schema.name, schema.schema)
        }

        //Define o mapa de schemas
        this.schemas = schemasMap;
    }

    //Obtém um schema por nome
    getSchema(name) {
        return this.schemas.get(name)
    }

    //Obtém o schema do Client
    async getClient() {

        // Pega o Documento 
        const clientSchema = await this.schemas.get("Client").findOne({});

        //Se ele existe, retone ele
        if (clientSchema) return clientSchema

        //Caso não exista, retorne criando um.
        return await this.schemas.get("Client").create({});

    }

    //Obtém ou cria um usuário apartir de um ID
    async user(userid) {
        //Se o ID não for informado, retorne nulo.
        if (!userid) return null;

        // Pega o Documento
        const UserSchema = this.schemas.get("User")
        const existUser = await UserSchema.findOne({ id: userid });

        //Se ele existe, retorne ele
        if (existUser) return existUser;

        //Caso não, crie ele com o ID
        const userdb = await UserSchema.create({
            id: userid
        });

        //Retorne o documento criado.
        return userdb
    }

    //Obtém ou cria um servidor apartir de um ID
    async guild(guildid) {
        //Se o ID não for informado, retorne nulo.
        if (!guildid) return null;

        //Pega o Documento
        const GuildSchema = this.schemas.get("Guild");
        const existGuild = await GuildSchema.findOne({ id: guildid });

        //Se ele existe, retorne ele.
        if(existGuild) return existGuild;

        //Caso não, crie ele com o ID
        const guilddb = await GuildSchema.create({
            id: guildid
        })

        //Retorne o documento criado.
        return guilddb;
    }

    //Obtém todos os schemas
    getAllSchemas() {
        return this.schemas;
    }
}