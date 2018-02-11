const settings = require('../settings.json');
const moment = require('moment');

module.exports = member => {
  let guild = member.guild;
  let modlog = guild.channels.find('name', settings.welcomeChanel);

  console.log(`${member.user}, ${guild.name} sunucusuna katıldı! ${new Date()}`);

  guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}: ${member.user.username} aramıza katıldı. ${new Date()}`);
};
