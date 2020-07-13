const data = require('../modules/DataHandler')
const config = require("../modules/config")
const Lm = require("../modules/LoadingHandle")
const Fm = require("../modules/FunctionModules")
const Discord = require('discord.js')

async function ArgumentHandler(classf,args,msg) {

    actargs = [];

    let  res = [true];

    await Fm.asyncForEach(classf.args,async e => {

        word = []
        if (e.Pos === 'all') 
            {
                word = args
                if (!word || word == '') if (e.Needed) return res =[false, `Missing argument "${e.Name}" @ position [all]`]; else return
                
            }
        else{ 
            let c = null
            e.Pos.forEach( v => {

                if (! args[v]) if (e.Needed) return res =[false, `Missing argument "${e.Name}" @ position ${v}`]; else return c = true
                word.push(args[v])
            })

            if (c) return 
        }
        if (res[0] == false) return ;

            //if (! args[e.Pos]) if (e.Needed) return res =[false, `Missing argument "${e.Name}" @ position ${e.Pos}`]; else return

        if (e.Prefix && !word.join(' ').startsWith(e.Prefix) ) if (e.Needed) return res = [false, `Error | Incorrect prefix.\nExpected prefix : "${e.Prefix + word.join(' ')}",\ngot "${word.join(' ')}"`]; else return

        if (e.Prefix) word = word.join(' ').slice(e.Prefix.length);
        else word = word.join(' ')
        if (e.SetContent) if (word != e.Name) if(e.Needed) return res = [false, `Error | Expected the content to be exactly the same as name, except there was a difference.`]; else return

        let conved = await Fm.convert(word, e.Type , msg );

        if (!  conved[0]) if (e.Needed) return res = [false, `Error | Incorrect argument type at "${word}", \nType gotten : ${typeof  word }\nExpected type : ${e.Type}`]; else return
        try {if (! msg.member.permissions.has(e.Perms)) res = [false,`Error | You are missing permissions to use this argument.\nPermissions needed : \`${msg.member.permissions.missing(e.Perms).join(' | ')}\``]}
        catch(e) {return res = [false, `Error | You must be in a guild to use this argument`] }
        if (res[0] == false) return
        actargs[ e.Name ] = {clas : e, arg : conved[1] }

    })   

    if (res[0] == true) res.push(actargs);


    return res

}


module.exports = async (bot, message) => {

    if (message.content.indexOf(config.Prefix) !== 0) return;
    const args = message.content.slice(config.Prefix.length).trim().split(/ +/g);
    const comm = args.shift().toLowerCase();
    prams = args.slice(0).join(" ") //EXTRA ARGSD


    var Command = Fm.getCommandFromStr(comm).cmd

    //console.log( await getUserFromStr(args[0],message.guild, message))

    if (!Command) return

    CommandClass = Command.Class

    if (!CommandClass) return message.channel.send('Found command, but can\'t execute due to it not being a class. (Technical issue)')

    if (CommandClass.ownerOnly == true ) {

        if(!Fm.IsOwner(message.author) ) return message.channel.send(`Sorry, but only the owners \`(${await Fm.GetOwners(bot)})\` can execute this command.`)

    }

    if (CommandClass.userPerms) 
        if(! message.member.permissions.has(CommandClass.userPerms)) 
            return message.channel.send(`You do not have the Required permissions to use this command.\nPermissions missing :\`${message.member.permissions.missing(CommandClass.userPerms)}\` `);

    res = await ArgumentHandler(CommandClass,args,message)
    if (res[0] == false) return message.channel.send(res[1])

    let result = await CommandClass.Execute(bot,{
        Message: message,
        OwnClass: CommandClass,
        Prams : res[1]
    }).catch(e => {
        console.error(`\nCommand <${CommandClass.memberName}> has errored, \nInformation :${e.name} - ${e.message}\n\n--------------Stack--------------\n${e.stack}\n`.gray);
        return 'e'
    })
    try{
    if (result[0] == false) message.channel.send(result[1])
    else if (result[0] == true && result[1]) message.channel.send(result[1])
    }catch(e) {}
    if (result == 'e') {

        await message.channel.send(`Sorry, there has been an error executing that command. The logs has been sent to ${await Fm.GetOwners(bot)}`)

    }

}