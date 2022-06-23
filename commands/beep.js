const { SlashCommandBuilder } = require('@discordjs/builders');

// export data in Node.js so that you can require it in other files
module.exports = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with Boop!'),
  async execute(interaction) {
    await interaction.reply('Boop!');
  },
};
