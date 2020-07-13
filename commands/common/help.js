const classes = require('../../modules/classes')
const Fm = require('../../modules/FunctionModules')
const Discord = require("discord.js")

const Lm = require('../../modules/Loadinghandle')

var Bot

CreateCommandEmbed = (clas) => {

    if (!clas) return [false]

    const emb = new Discord.MessageEmbed()
        .setAuthor(Bot.user.username, Bot.user.avatarURL('png',false,128) )
        .setColor('DARK_VIVID_PINK')
        .setDescription(`Help for the command "${clas.memberName}"`)
        .setTitle(clas.memberName)
        .addField(`usage: \`.${clas.Name} ${clas.args.map(e => `${!e.Needed? `[${e.Prefix ? e.Prefix : ''}${e.Name}]`: `${e.Prefix ? e.Prefix : ''}<${e.Name}>` }`).join(' ') } \``, '[] = optional, <> = needed',true)
        .addField('Description:', clas.desc,true)
        .addField('Guild Only:', clas.guildOnly,true)
        .addField('Permissions', clas.userPerms ? clas.userPerms.toArray().map(v=> v.toLowerCase().replace('_', ' ') ).join(' *|*') : 'None')
        .addField('Aliases:', !clas.alias.length <= 0 ? clas.alias.join(' | ') : 'None',true)
        .addField('Hidden:', clas.Hidden,true)
        .addField('Level:', clas.Level,true)
    return new classes.Data(true,emb)
}

Execute = async function (bot, Args) {

    Bot = bot

    if (Args.Prams.Command) {

        var Command = Fm.getCommandFromStr(Args.Prams.Command.arg).cmd

        if (!Command) return Args.Message.channel.send(`Unable to find a command named "${Args.Prams.Command.Name}".`)

        emb = CreateCommandEmbed(Command.Class)

        Args.Message.channel.send(emb.Worked ? emb.Returned : 'Sorry, but something went wrong. the stack has been sent to the owners.')

    }
    else {

        cmds = Fm.getAllCommands()
        var arr = new Object()

        Object.keys(cmds).forEach((k) => {
    

            if (!arr[k.split('_')[0]]) arr[k.split('_')[0]] = new Array()

            cmds[k].forEach( (j,h) => {


                arr[k.split('_')[0]].push(j)
    
            })

        })
        let Hidden = 0
        const emb = new Discord.MessageEmbed()
        .setAuthor(Bot.user.username, Bot.user.avatarURL('png',false,128) )
        .setColor('DARK_VIVID_PINK')
        .setTitle('Help')
        .setDescription(`Lists commands.\n If you wish to get more information about these commands please do \`.help <command name>\`.`)
        .setTimestamp(Date.now())
        Object.keys(arr).forEach( k => {
            v = arr[k]
            v.forEach( (f,i) => { if (f.Class.Hidden && !Fm.IsOwner( Args.Message.author ) ) {Hidden++;v.splice(i,1); console.log('Removing',i)}})
            // emb.addField(k, ` ${v.map(v=> `${v.Class.Name}${v.Class.Hidden ? ' *[HIDDEN]*' : ''}: \n\`.${v.Class.Name} ${v.Class.args.map(e => `${!e.Needed? `[${e.Prefix ? e.Prefix : ''}${e.Name}]`: `${e.Prefix ? e.Prefix : ''}${e.Name}` }`).join(' ') } \``).join('\n')} ${Hidden > 0 ? `+${Hidden} Hidden More.` : ''}`,true)
            emb.addField(k, ` ${v.map(v=> `• ${v.Class.Name}${v.Class.Hidden ? ' *[HIDDEN]*' : ''}`).join('\n')} ` + ` ${Hidden > 0 ? `+${Hidden} Hidden More.` : ''}`,true)
        })

        Args.Message.channel.send(emb)

    }


}


exports.Class = new classes.Command(Execute, {


    name: 'help',
    memberName: 'help',
    desc: 'Get help about commands',
    guildOnly: false,
    throt: {
        Usage: 999,
        Dur: 0
    },
    args: [
        new classes.CommandArg({

            name: 'Command',
            type: 'string',
            needed: false,
            pos: 0,
            prefix: ''
        }),
    ]


})