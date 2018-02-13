const settings = require('../settings.json');
const moment = require('moment');

module.exports = member => {
  if (!member || !member.id || !member.guild) return;
  let guild = member.guild;
  let modlog = guild.channels.find('name', settings.welcomeChanel);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss')}: ${member.user.username}, ${guild.name} sunucusundan ayrıldı.`);

  if(!modlog) return;
  guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}: ${member.user} aramızdan ayrıldı. Şunda ${guild.membersCount}`).catch(console.error);
};
