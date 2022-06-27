// export data in Node.js so that you can require it in other files
module.exports = {
  name: 'ping',
  description: 'replies with Pong!',
  permission: 'ADMINISTRATOR',
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply({ content: 'Pong!' });
  },
};
