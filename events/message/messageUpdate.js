const { MessageEmbed, Message, WebhookClient } = require('discord.js');

module.exports = {
  name: 'messageUpdate',
  /**
   * @param {Message} oldMessage
   * @param {Message} newMessage
   */
  execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;

    if (oldMessage.content === newMessage.content) return;
    /* discord can only do 4096 characters we need more characters for old and new mesage and embed*/
    const Count = 1950;

    const Original = oldMessage.content.slice(0, Count) + (oldMessage.content > Count ? ' ...' : '');
    const Edited = newMessage.content.slice(0, Count) + (newMessage.content > Count ? ' ...' : '');

    const Log = new MessageEmbed()
      .setColor('#35093f')
      .setDescription(`${newMessage.author} **edited** a [message](${newMessage.url}) in ${newMessage.channel}.\n
      **Original**:\n \`\`\`${Original}\`\`\` \n **Edited**:\n \`\`\`${Edited}\`\`\``)
      .setFooter({ text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

    new WebhookClient({
      id: '991739003210584094',
      token: 'zZmPpdZ5rvCyLVI-yWoarmjIZRB1d7FQSWkXASAjSfQKdGcoxGZ48XyI5YaGbN_JheGz',
    }).send({ embeds: [Log] }).catch((err) => console.log(err));
  },
};
