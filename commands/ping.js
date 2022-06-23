const { SlashCommandBuilder } = require('@discordjs/builders');

// export data in Node.js so that you can require it in other files
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
