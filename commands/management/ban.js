const classes = require('../../modules/classes')
const discord = require('discord.js')
const Fm = require('../../modules/FunctionModules')

Execute = async function (bot,Args) {

    if (! Fm.HasHigherPerms(Args.Message.member,Args.Prams.user.arg) ) return [false, 'The user you\'re trying to ban `has higher or equal permissions to you.`']

    if(!Args.Prams.user.arg.Bannable) return [false,'Unable to ban that user due to their role being higher than mine, or that i dont have the needed permissions to ban this user.']

    Args.Prams.user.arg.ban({reason:`${Args.Prams.user.arg.displayName} was banned by ${Args.Message.member.displayName} with reason:\n${Args.Prams.reason? Args.Prams.reason : 'No reason'}`})

    return [true,`Successfully banned \` ${Args.Prams.user.arg.displayName} \``]

}


exports.Class = new classes.Command(Execute, {


    name: 'ban',
    memberName: 'ban',
    desc: 'ban things.',
    guildOnly: true,
    throt: {
        Usage: 999,
        Dur: 0
    },
    userPerms: new discord.Permissions([
        'BAN_MEMBERS'



    ]),
    args: [
        new classes.CommandArg({

            name : 'user',
            type : 'guildmember',
            needed : true,
            pos : 0,
            prefix : ''
        }),
        new classes.CommandArg({

            name : 'time',
            type : 'string',
            needed : false,
            pos : 1,
            prefix : ''
        }),
        new classes.CommandArg({

            name : 'reason',
            type : 'string',
            needed : false,
            pos : 2,
            prefix : ''
        }),
    ]


})