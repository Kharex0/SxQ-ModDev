const {RichEmbed} = require('discord.js'); // eslint-disable-line no-unused-vars
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const prefix = require('../settings.json').prefix;

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);
if (!modlog) return message.reply('**"mod-log"** kanalını bulamadım.');
if (message.mentions.users.size < 1) return message.reply('Birisini uyarmak için ondan bahsetmelisin.').catch(console.error);

const reason = args.splice(1, args.length).join(' ') || `Moderatör girişi bekleniyor. ${prefix}reason ${caseNum} <sebep>.`;
const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Eylem:** Uyarı\n**Hedef:** ${user.tag}\n**Moderatör:** ${message.author.tag}\n**Sebep:** ${reason}`)
    .setFooter(`Olay ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyar'],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Bahsedilen kullanıcıya bir uyarı gönderir.',
  usage: 'warn [mention] [sebep]'
};
