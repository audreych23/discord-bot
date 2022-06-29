const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = {
  name: 'guildMemberRemove',
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    const Logger = new WebhookClient({
      id: '991739003210584094',
      token: 'zZmPpdZ5rvCyLVI-yWoarmjIZRB1d7FQSWkXASAjSfQKdGcoxGZ48XyI5YaGbN_JheGz',
    });

    const Log = new MessageEmbed()
      .setColor('RED')
      .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        ${member} has left the community\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
      .setFooter(`ID: ${user.id}`);

    Logger.send({ embeds: [Log] });
  },
};
