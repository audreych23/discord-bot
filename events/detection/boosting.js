const { GuildMember, MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: 'guildMemberUpdate',
  /**
   * @param {GuildMember} oldMember
   * @param {GuildMember} newMember
   */
  async execute(oldMember, newMember) {
    const { guild } = newMember;

    const Thankyou = new MessageEmbed()
      .setColor('PURPLE')
      .setAuthor({ name: 'SERVER BOOSTED', iconURL: guild.iconURL({ dynamic: true, size: 512 }) });

    console.log(oldMember.premiumSince);
    console.log(newMember.premiumSince);
    if (!oldMember.premiumSince && newMember.premiumSince) {
      const canvas = Canvas.createCanvas(800, 250);
      // to edit the canvas
      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage('./structures/images/booster.png');

      // stretch the image to be the same size as the canvas
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#9B59B6';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = '38px cursive';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);

      const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: 'jpg' }));

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 25, 25, 200, 200);
      const attachment = new MessageAttachment(canvas.toBuffer(), 'booster.png');

      Thankyou.setDescription('Thank you for boosting the server!');
      Thankyou.setImage('attachment://booster.png');


      guild.systemChannel.send({ embeds: [Thankyou], files: [attachment] }).catch((err) => console.log(err));

      Thankyou.setDescription('Thank you for boosting the server! Your support is much appreciated.');
      newMember.send({ embeds: [Thankyou] });
    }

  },
};
