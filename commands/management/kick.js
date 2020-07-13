const classes = require('../../modules/classes')
const discord = require('discord.js')
const Fm = require('../../modules/FunctionModules')

Execute = async function (bot,Args) {

    if (! Fm.HasHigherPerms(Args.Message.member,Args.Prams.user.arg) ) return [false, 'The user you\'re trying to kick `has higher or equal permissions to you.`']

    if(!Args.Prams.user.arg.kickable) return [false,'Unable to kick that user due to their role being higher than mine, or that i dont have the needed permissions to ban this user.']

    Args.Prams.user.arg.kick({reason:`${Args.Prams.user.arg.displayName} was kick by ${Args.Message.member.displayName} with reason:\n${Args.Prams.reason? Args.Prams.reason : 'No reason'}`})

    return [true,`Successfully kicked \` ${Args.Prams.user.arg.displayName} \``]

}

exports.Class = new classes.Command(Execute, {


    name: 'kick',
    memberName: 'kick',
    desc: 'kick things.',
    guildOnly: true,
    throt: {
        Usage: 999,
        Dur: 0
    },
    userPerms: new discord.Permissions([
        'KICK_MEMBERS'



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

            name : 'reason',
            type : 'string',
            needed : false,
            pos : 1,
            prefix : ''
        }),
    ]


})