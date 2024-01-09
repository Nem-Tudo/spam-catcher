/**
 * Responsável por carregar todos os módulos.
 * 
 * Desenvolvido por: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

//Registrar .env
require("dotenv").config();

//Importações
const Discord = require("discord.js");

//Importações de classes
const GouClient = require("./src/structures/GouClient");

//Criação do Client
const client = new GouClient({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages,
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.Reaction
    ]
});

//Carregar o handler de funções
const functionHandler = require("./src/handlers/functionHandler");
new functionHandler(client).handler();

//Carregar o handler de eventos
const eventHandler = require("./src/handlers/eventHandler")
new eventHandler(client).handler();

//Carregar o handler de comandos
const commandHandler = require("./src/handlers/commandHandler")
new commandHandler(client).handler();

//Carregar o handler de botões
const buttonHandler = require("./src/handlers/buttonHandler");
new buttonHandler(client).handler();

//Carregar o handler de modais
const modalHandler = require("./src/handlers/modalHandler");
new modalHandler(client).handler();

//Inicialização do bot
client.login(process.env.BOT_TOKEN);