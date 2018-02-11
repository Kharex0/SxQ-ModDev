const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
  const toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
  await parseUser(message, user);
  if (toMute.id === message.author.id) 
    return message.channel.send(`${message.author.username}? Hayır! Bunu kendine yapmana izin veremem, neden denedin ki?`);

  if (toMute.highestRole >= message.member.highestRole) 
    return message.channel.send('Hedef üye, senin konumundan daha yüksek ya da eşit bir role sahip!\nÜzgünüm, ne demişler "Çayda dem, Discord\'ta kıdem!');
 
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'MyBot Muted');

  if (message.mentions.users.size < 1) return message.reply('Birisini susturmak için ondan bahsetmen gerekir.').catch(console.error);

  if (!modlog) await message.guild.createChannel('mod-log', 'text').then(channel => console.log(`Yeni kanal oluşturuldu: ${channel}`)).catch(console.error);

  if (!muteRole) {
    try {
      role = await message.guild.createRole({
        name: 'MyBot Muted',
        color: '#000000',
        permissions: [ ]
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      });
    } catch (e) {
    console.log(e)
    }
  };

  const reason = args.splice(1, args.length).join(' ') || `Moderator girişi beklenikor. ${settings.prefix}reason ${caseNum} <sebep>.`;

  const embed = new MessageEmbed()
    .setAuthor('MUTE', 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/keyboard-delete-icon.png')
    .setDescription(`**Kullanıcı Susturuldu.**\n**Sebep:** ${reason}`)
    .setColor(0x00AE86)
    .setThumbnail(toMute.user.displayAvatarURL)
    .setTimestamp()
    .addField('**Tam Adı**', `${toMute.user.username}#${toMute.user.discriminator}`, true)
    .addField('**ID**', toMute.id, true)
    .addField(`**Moderatör:**`, `${message.author.username}#${message.author.discriminator}`, true)
    .setFooter(`Olay ${caseNum}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Rolleri ve izinleri değiştirme yetkisine sahip değilim.').catch(console.error);

  if (message.guild.member(toMute).roles.has(muteRole.id)) {
    message.guild.member(toMute).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(toMute).addRole(muteRole, reason).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Bahsedilen kişiyi susturur.',
  usage: 'mute [mention] [sebep]'
};
