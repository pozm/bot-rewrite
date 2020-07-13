const classes = require('../../modules/classes')
const discord = require('discord.js')


Execute = async function (bot,Args) {

    console.log('Working!')




}


exports.Class = new classes.Command(Execute, {


    name: 'test',
    memberName: 'test',
    desc: 'Default test things.',
    guildOnly: false,
    throt: {
        Usage: 999,
        Dur: 0
    },
    userPerms: new discord.Permissions([
        'ADMINISTRATOR'



    ]),
    args: [
        new classes.CommandArg({

            name : 'test',
            type : 'boolean',
            needed : true,
            perms : new discord.Permissions([
                'ADMINISTRATOR',
                'MANAGE_ROLES',
                'BAN_MEMBERS',
                'MANAGE_EMOJIS'
                

            ]),
            pos : 0,
            prefix : '-'
        }),
        new classes.CommandArg({

            name : 'test2',
            type : 'number',
            needed : false,
            pos : 1,
            prefix : '-'
        }),
    ]


})