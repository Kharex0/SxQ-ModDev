const chalk = require('chalk'); // eslint-disable-line no-unused-vars
const prefix = require ('../settings.json').prefix;

module.exports = client => {
  console.log(chalk.bgGreen('myBot online!'));
  client.user.setActivity(prefix + 'help');

  client.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(`Bot davet linki oluşturuldu: ${link}`);
  }).catch(e =>{
    console.log(e.stack);
  });
};
