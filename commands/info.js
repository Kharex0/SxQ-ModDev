const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
  
  var member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(message.author.id);
    let allRoller = await member.roles.map(r => r.name)
   
    let everyoneIndex = await allRoller.indexOf('@everyone')
    let everyone = await allRoller.splice(everyoneIndex, 1);
    let roller = allRoller.join(' ❱ ');
    if (member.nickname === null) member.nickname = 'None';

    // console.log(roller[i],i++);
    let game;
    if(!member.presence.game) game = 'None'; else game = member.presence.game.name;
    let embed = new Discord.MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL)
    .setDescription('Kullanıcı Bilgileri')
    .setColor('#4286f4')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .addField('Kullanıcı Adı', `${member.user.username}#${member.user.discriminator}\n `, true)
    .addField('Nick', `${member.nickname}`, true)
    .addField('Kullanıcı ID', `${member.user.id}`, true)
    .addField('Durum', `${member.presence.status}`, true)
    .addField('Aktivite', game, true)
    .addField('Bot?', `${member.user.bot}`, true)
    .addField('Sunucudaki Rolü', roller)
    .addField('Discord\'a Katılma', `${moment(member.user.createdTimestamp).format('DD-MM-YYYY HH:mm:ss')}`, true)
    .addField('Sunucuya Katılma', `${moment(member.joinedTimestamp).format('DD-MM-YYYY HH:mm:ss')}`, true)
    ;

  message.channel.send(embed);
  //console.log(roller[0]);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Kullanıcı bilgilerini gösterir',
  usage: 'info (@bahsetme)'
};
