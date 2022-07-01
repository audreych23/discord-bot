const { MessageEmbed, Message, WebhookClient } = require('discord.js');

module.exports = {
  name: 'messageDelete',
  /**
   * @param {Message} message
   */
  execute(message) {
    if (message.author.bot) return;

    const Count = 4096;
    let messageContent = '';
    if (message.content) {
      messageContent = message.content.slice(0, Count) + (message.content > Count ? ' ...' : '');
    }
    else {
      messageContent = 'None';
    }
    const Log = new MessageEmbed()
      .setColor('#FFA100')
      .setDescription(`${message.author.tag} **deleted** a [message](${message.url}) in ${message.channel}.\n
      **Deleted Message:**\n \`\`\`${messageContent}\`\`\``);

    if (message.attachments.size >= 1) {
      Log.addField('Attachments:', `${message.attachments.map(a => a.url)}`, true);
    }

    new WebhookClient({
      id: '991739003210584094',
      token: 'zZmPpdZ5rvCyLVI-yWoarmjIZRB1d7FQSWkXASAjSfQKdGcoxGZ48XyI5YaGbN_JheGz',
    }).send({ embeds: [Log] }).catch((err) => console.log(err));
  },
};
