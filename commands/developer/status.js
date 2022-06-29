const { MessageEmbed } = require('discord.js');
const { connection } = require('mongoose');
require('../../events/client/ready');

module.exports = {
  name: 'status',
  description: 'Displays the status of the client and database connection',
  /**
   * @param {commandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Response = new MessageEmbed()
      .setColor('AQUA')
      .setDescription(`**Client**: \`ONLINE\` - \`${client.ws.ping}ms\`\n
      **Database**: \`${switchIo(connection.readyState)}\``);

    interaction.reply({ embeds: [Response] });
  },
};

function switchIo(val) {
  let status = ' ';
  switch (val) {
  case 0:
    status = '🔴 DISCONNECTED';
    break;
  case 1:
    status = '🟢 CONNECTED';
    break;
  case 2:
    status = '🟡 CONNECTING';
    break;
  case 3:
    status = '🟣 DISCONNECTING';
    break;
  default:
    status = ' ';
    break;
  }
  return status;
}
