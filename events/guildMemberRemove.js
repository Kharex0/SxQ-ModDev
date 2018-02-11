const settings = require('../settings.json');
const moment = require('moment');

module.exports = member => {
  let guild = member.guild;
  let modlog = guild.channels.find('name', settings.welcomeChanel);

  console.log(`${member.user.username}, ${guild.name} sunucusundan ayrıldı. ${new Date()}`);

  member.guild.channels.get(modlog.id).send({}).catch(console.error);
  guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}: ${member.user} aramızdan ayrıldı. ${new Date()}`);
};
