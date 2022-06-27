// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: 32767 });

// attach .commands propertyto the client instance so it can access commands in other files
client.commands = new Collection();

require('./handlers/events')(client);
require('./handlers/commands')(client);

client.login(token);
