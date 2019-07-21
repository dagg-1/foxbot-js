const Discord = require('discord.js')
const client = new Discord.Client()
const randomcolour = require('randomcolor')

var token = "EDIT.TOKEN"

const foxPhrases = [
    "A fox appears!", 
    "A fox is here!", 
    "Theres a fox here!", 
    "A fox has manifested!",
    "A fox has taken hold!",
    "There's a fox in my boot!",
    "A wild fox has appeared!",
    "A fox challenges you!",
    "You see a fox!",
    "Wow! A fox!"
]

client.login(token)

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', msg => {
    switch(msg.content)
    {
        case "/about":
            var aboutEmbed = new Discord.RichEmbed()
            .setColor(randomcolour())
            .setThumbnail("https://dagg.xyz/randomfox/images/" + Math.floor(Math.random() * 126) + ".jpg")
            .setTitle("GitHub")
            .setURL("https://github.com/daggintosh/foxbot-js")
            .setDescription("**Hello!**")
            .setAuthor("FoxBot", "https://cdn.discordapp.com/avatars/601967284394917900/f25955e890f89f1015762647f82ea555.webp")
            msg.channel.send(aboutEmbed)
            break;
        case "/fox":
            fox()
            function fox()
            {
            var foxEmbed = new Discord.RichEmbed()
            .setColor(randomcolour())
            .setTitle(foxPhrases[Math.floor(Math.random()*foxPhrases.length)])
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setImage("https://dagg.xyz/randomfox/images/" + Math.floor(Math.random() * 126) + ".jpg")
            let filterplay = (reaction, user) => reaction.emoji.name === "➡" && user.id === msg.author.id
            let filterstop = (reaction, user) => reaction.emoji.name === "⏹" && user.id === msg.author.id
            msg.channel.send(foxEmbed)
            .then(function(msg){
                let collectorplay = msg.createReactionCollector(filterplay, { time: 60000 })
                let collectorstop = msg.createReactionCollector(filterstop, { time: 60000 })
                collectorplay.on('collect', z => {
                    msg.delete();
                    fox();
                })
                collectorstop.on('collect', z => {
                    msg.delete();
                })
                msg.react("➡")
                .then(z =>{
                    msg.react("⏹")
                })
            })     
            }
            break
    }
})

