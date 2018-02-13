const Discord = require('discord.js');
const prefix = require('../settings.json').prefix;

exports.run = async (client, message, args, perms) => {
  
   // Sends a message to the channel.
   
   // Cancels out of the script, so the rest doesn't run.
 
   // let messagecount = parseInt(args.join(' '));
   // const fetched = message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
   // console.log(fetched.size + ' mesaj bulundu, siliniyor...'); // Lets post into console how many messages we are deleting

   // Deleting the messages
   // message.channel.bulkDelete(fetched)
   //   .catch(error => message.channel.send(`Error: ${error}`));


  let messagecount = parseInt(args.join(' '));
  await message.delete();
  if (messagecount < 2) return message.channel.send(`Lütfen 2-99 arasında bir sayı girin. \nKullanım: ${prefix}purge <miktar>`);

  message.channel.messages.fetch({
    limit: messagecount
  }).then(messages =>
    message.channel.bulkDelete(messages));
  message.channel.send(`${message.author} tarafından '${messagecount}' adet mesaj silindi! ${message.createdAt}`).then(
  response => response.delete(10000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'X adet mesajı kullanılan kanaldan siler!',
  usage: 'purge <sayı>'
};
 