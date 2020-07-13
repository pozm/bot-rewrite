const classes = require('../../modules/classes')
const discord = require('discord.js')


Execute = async function (bot,Args) {

    if (Args.Prams.user) {

        return [true, new discord.MessageEmbed({

            author : {
                name:Args.Prams.user.arg.displayName,
                iconURL: Args.Prams.user.arg.user.avatarURL()
                
            },
            color: Args.Prams.user.arg.displayColor,
            description: `Information on the user < ${Args.Prams.user.arg.displayName} >.`,
            thumbnail: {url:Args.Prams.user.arg.user.avatarURL()},

            fields : [

                {

                    name:'id',
                    value:Args.Prams.user.arg.id
                    

                },
                {

                    name:'roles',
                    value:Args.Prams.user.arg.roles.cache.array().join(' | ')
                    

                },
                {

                    name:'Joined server',
                    value:Args.Prams.user.arg.joinedAt
                    

                },
                {

                    name:'Last channel seen in',
                    value:Args.Prams.user.arg.lastMessage ? Args.Prams.user.arg.lastMessage.channel.name : 'Not in this guild!'
                    

                },
                {

                    name:'In voice channel?',
                    value:`${Args.Prams.user.arg.voice.sessionID ? `yes, ${Args.Prams.user.arg.voice.channel.name}` : 'no' }`
                    

                },

            ]

        })]


    } else if (Args.Prams.server) {

        return [true, new discord.MessageEmbed({

            

        })]

    }


    return [false,'unable to determine which type of info you wanted.']

}


exports.Class = new classes.Command(Execute, {


    name: 'info',
    memberName: 'info',
    desc: 'Get information',
    guildOnly: false,
    args: [
        new classes.CommandArg({

            name : 'server',
            type : 'string',
            needed : false,
            pos : 0,
            prefix : '',
            setcontent : true
        }),
        new classes.CommandArg({

            name : 'user',
            type : 'guildmember',
            needed : false,
            pos : 0,
            prefix : '',
            setcontent : false
        }),
    ]


})