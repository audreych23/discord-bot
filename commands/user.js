const { SlashCommandBuilder } = require('@discordjs/builders');

// export data in Node.js so that you can require it in other files
module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
  async execute(interaction) {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  },
};
