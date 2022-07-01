// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');
const { token } = require('./config.json');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

// Create a new client instance
const client = new Client({ intents: 32767 });

// attach .commands propertyto the client instance so it can access commands in other files
client.commands = new Collection();
['events', 'commands'].forEach(handler => {
  require(`./handlers/${handler}`)(client, PG, Ascii);
});

client.login(token);
