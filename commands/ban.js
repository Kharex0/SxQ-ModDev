const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  await parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = caseNumber(client, modlog);
  if (!modlog) return message.reply('**"mod-log"** kanalını bulamadım.');
  if (message.mentions.users.size < 1) return message.reply('Birisini banlamak için ondan bahsetmelisin.').catch(console.error);
  message.guild.ban(user, 2);

  const reason = args.splice(1, args.length).join(' ') || `Moderator girişi beklenikor. ${settings.prefix}reason ${caseNum} <sebep>.`;
  const embed = new MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Eylem:** Ban\n**Hedef:** ${user.tag}, (${user.id})\n**Moderatör:** ${message.author.tag}\n**Sebep:** ${reason}`)
    .setFooter(`Olay ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bahsedilen kişiyi sunucuda banlar!',
  usage: 'ban [mention] [sebep]'
};
