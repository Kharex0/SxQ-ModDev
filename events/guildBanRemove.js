const Discord = require('discord.js');
const settings = require('../settings.json');
const moment = require('moment');

module.exports = (guild, user) => {
  console.log(`${user.username}, ${guild.name} sunucusunda banı kaldırıldı!!`);

  let modlog = guild.channels.find('name', settings.welcomeChanel);

  guild.channels.get(modlog.id ).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}: "${user.username}", ${guild.name}(${guild.id})'de banı kaldırıldı!! ${new Date()}`);
  //const embed = new Discord.RichEmbed()
    //.setColor(0x00AE86)
    //.setTimestamp()
    //.setDescription(`**Eylem:** Unban\n**Hedef:** ${user.tag}, (${user.id})\n**Moderatör:** ${guild.client.unbanAuth.tag}\n**Sebep:** ${guild.client.unbanReason}`);
  //return guild.channels.find('name', 'mod-log').send({embed});

};
