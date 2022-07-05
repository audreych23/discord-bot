// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');
const { token, nodes, SpotifyClientID, SpotifySecret } = require('./config.json');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

const Deezer = require('erela.js-deezer');
const Spotify = require('better-erela.js-spotify').default;
const Apple = require('better-erela.js-apple').default;
const { Manager } = require('erela.js');

// Create a new client instance
const client = new Client({ intents: 32767 });

client.manager = new Manager({
  nodes,
  plugins: [
    new Spotify({
      clientID: SpotifyClientID,
      clientSecret: SpotifySecret,
    }),
    new Apple(),
    new Deezer(),
  ],
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});
// attach .commands property to the client instance so it can access commands in other files
client.commands = new Collection();

module.exports = client;

require('../systems/giveaway_sys')(client);

['events', 'commands'].forEach(handler => {
  require(`./handlers/${handler}`)(client, PG, Ascii);
});

client.login(token);
