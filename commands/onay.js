const Discord = require('discord.js');
const settings = require('../settings.json');

exports.run = async (client, message, args)  => {
    let guild = message.guild;
    let verify = message.guild.roles.find("name", settings.verifyRole);
    let role = message.guild.roles.find("name", settings.memRole);
    let rules = message.guild.channels.find('name', settings.rulesChannel);
    let wellcome = message.guild.channels.find("name", settings.welcomeChanel)
    let target = message.member

    let messages = await rules.messages.fetch({limit:50});
    let msg = messages.filter(m => ~/*m.author.id === client.user.id && */m.content.startsWith(`${target}`)).first();
    
    if(target.roles.has(role.id)) return;   
    if(message.channel !== rules) return message.channel.send(`Onaylama işlemi sadece ${settings.memRole} kanalında yapılabilir!`);

    await target.roles.remove(verify, 'Kuralları onayladı.').catch(console.error);
    await target.roles.add(role, 'Kuralları onayladı.').catch(console.error);

    
    message.delete().catch(console.error);
    if(!msg) return;
    msg.delete().catch(console.error);

    message.guild.channels.get(wellcome.id).send(`__${target}__ aramıza katıldı. Şuanda **${message.guild.members.size}** kişiyiz!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['verify', 'onaylıyorum', 'kabul', 'ok'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'onay',
    description: 'Üye sunucu kurallarını onaylar.',
    usage: 'onay'
  };