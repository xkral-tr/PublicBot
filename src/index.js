////////////////////////////////////////
///
///     index.js v0.1.0
///
////////////////////////////////////////

// Discord
const { Client } = require('discord.js');

// DOTENV Configuration
const dotenv = require('dotenv');
dotenv.config();

const client = new Client(); // Client

// ON ...
const OnReady = require('./bot/OnReady');
const OnMessage = require('./bot/OnMessage');

// Bot ready.
client.on('ready', () => {
    OnReady(client);
});

// Bot receive a message
client.on('message', (message) => {
    OnMessage(client, message);
});

// Channel Created.
// TODO: DATABASE THING
client.on('channelCreate', () => {});

// Login
client.login(process.env.BOT_TOKEN);
