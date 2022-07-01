const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = {
  name: 'guildMemberAdd',
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;
    member.roles.add('991731223502258336');

    const Welcomer = new WebhookClient({
      id: '991732229808062464',
      token: '2eDY2YKbN1L6Mxo01iJeiBmAOWDIpFqjq_M7PgQqZCBwjzVfl_Vs_PKvRDIPI9Tb18bd',
    });

    const Welcome = new MessageEmbed()
      .setColor('AQUA')
      .setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true, size: 512 }) })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        Welcome ${member} to the **${guild.name}**\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
      .setFooter({ text: `ID: ${user.id}` });

    Welcomer.send({ embeds: [Welcome] });
  },
};
