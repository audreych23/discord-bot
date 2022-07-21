const { Message, MessageEmbed } = require('discord.js');
const DB = require('../../structures/schemas/afkSystem');

module.exports = {
  name: 'messageCreate',
  /**
   * @param {Message} message
   */
  async execute(message) {
    if (message.author.bot) return;
    // if the afk person create a message, remove afk status and send a MessageEmbed (just comment this part if it looks annoying later)
    DB.findOne({ GuildID: message.guild.id, UserID: message.author.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const Embed = new MessageEmbed()
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
        Embed.setColor('RED').setDescription('Your AFK status has been removed.');
        return message.reply({ embeds: [Embed] });
      }
    });
    await DB.deleteOne({ GuildID: message.guild.id, UserID: message.author.id });

    if (message.mentions.members.size) {
      const Embed = new MessageEmbed()
        .setColor('RED');

      message.mentions.members.forEach((m) => {
        DB.findOne({ GuildID: message.guild.id, UserID: m.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            Embed.setDescription(`${m} went AFK <t:${data.Time}:R>\n **Status**: ${data.Status}`);
            return message.reply({ embeds: [Embed] });
          }
        });
      });
    }
  },
};
