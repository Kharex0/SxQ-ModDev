const settings = require('../settings.json');
const moment = require('moment');

module.exports = (guild, user) => {
  console.log(`${user.username}, ${guild.name} sunucusunda banlandı!!`);

  let modlog = guild.channels.find('name', settings.welcomeChanel);

  guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')}: "${user.username}", ${guild.name}(${guild.id})'de banlandı!! ${new Date()}`);
};
