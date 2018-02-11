const settings = require('../settings.json');
const moment = require('moment');

module.exports = message => {
  console.log(`Sunucu:${message.guild.name}; ${message.channel.name} kanalında '${message.cleanContent}' mesajı silindi.`);

  let modlog = message.guild.channels.find('name', settings.welcomeChanel);

  message.guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}:\nSunucu: ${message.guild.name};\n${message.channel} kanalında ${message.author.username} tarafından gönderilmiş,\n'${message.cleanContent}' mesajı  silindi.`);
};
