const { SlashCommandBuilder } = require('@discordjs/builders');

// export data in Node.js so that you can require it in other files
module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  async execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer creation time: ${interaction.guild.createdAt}`);
  },
};
