const Discord = require('discord.js');
const settings = require('../settings.json');

exports.run = async (client, message, args)  => {
    let rulesChannel = message.guild.channels.find('name', settings.rulesChannel);
    let target = message.member
    let memRole = message.guild.roles.find("name", settings.memRole);
    let messages = await rulesChannel.messages.fetch({limit:10});
    let msg = messages.filter(m => /*m.author.id === client.user.id &&*/
        m.content.startsWith(`<@`)).first();
   
    if(message.channel !== rulesChannel) return;

    if(!memRole) await message.guild.createRole({
        name: "member",
        color: "#000000",
        hoist: true,
        permisions:0
    });

    await target.roles.add(memRole);
    message.delete();
    if(!msg) return;
    msg.delete();
    

    //const messages = await rulesChannel.fetchMessages({limit:10});
    //const msg = messages.filter(m => m.author.id === client.user.id &&
    //    m.content.startsWith('<@')
    //  ).first();



    
    //console.log(msg.map(m=>m.id));


    /*rulesChannel.fetchMessages({ limit: 50})
    .then(messages => {
       
        let mes = messages.map().isMemberMentioned(target); //messages.find('id', '412276108688490497')
        for (var [id, content] of mes) {
            console.log(id + ' = ' + content)

        //if(messages.map(m=> m.content.startsWith('<@'))) { 
        //let welMess = messages.map();
        //console.log(welMess);
        //welMess.delete()
        }
        console.log(mes.content)
    })
    .catch(console.error);
  //  msg.delete();*/
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
  };
  
  exports.help = {
    name: '1',
    description: 'yeni yazılan komutların denemesi için kullanılır.',
    usage: '1'
  };