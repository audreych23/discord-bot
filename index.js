// Extends js Map class
const fs = require('node:fs');
// Helps constructs path to access files and directories
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');

const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: 32767 });

// attach .commands propertyto the client instance so it can access commands in other files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
// fs.readdirSync() method returns an array of all the file names in the directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

require('./handlers/events')(client);
// When the client is ready, run this code (only once)
// client.once('ready', c => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
//   client.user.setActivity('Coding in the dungeon');
// });
//
// client.on('interactionCreate', async interaction => {
//   console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
//   if (!interaction.isCommand()) return;
//
//   const command = client.commands.get(interaction.commandName);
//
//   if (!command) return;
//
//   try {
//     await command.execute(interaction);
//   }
//   catch (error) {
//     console.error(error);
//     await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//   }
// });


// Login to Discord with your client's token
client.login(token);
