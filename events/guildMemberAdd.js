const settings = require('../settings.json');
const moment = require('moment');

module.exports = async member => {
  if (!member || !member.id || !member.guild) return;
  let guild = member.guild;
  let verify = guild.roles.find("name", settings.verifyRole);

  if(!verify) guild.createRole({
    name: settings.verifyRole,
    color: "#000000",
    hoist: true,
    permisions:0
}).catch(console.error);

  await member.roles.add(verify, 'Kuralları onaylaması bekleniyor.').catch(console.error);

  let rules = guild.channels.find('name', settings.rulesChannel);

  guild.channels.get(rules.id).send(`${member}, **'${guild.name}'** sunucumuza hoş geldin.\n
    Eğer yukarıdaki kuralların tümünü kabul ediyorsan lütfen __${settings.prefix}onay__ yazın! :)\n
    Eğer kabul etmiyorsan seni sessizce dışarıya alalım :(`).catch(console.error);
};
