const classes = require('../../modules/classes')
const request = require('request')


Execute = async function (bot,Args) {

    console.log('https://assetgame.roblox.com/Asset/?id='+Args.Prams.AssetID.arg)

    request('https://assetgame.roblox.com/Asset/?id='+Args.Prams.AssetID.arg, async (err,res,bod) => {

        splitted = bod.split('\n')

        var ur

        splitted.forEach(e=> {

            if (e.trim().startsWith( '<url>' )) ur = e.trim().slice(5,-6)



        })

        if (!ur ) return Args.Message.channel.send('Unable to get id from that.')

        ur2 = ur.slice(ur.indexOf('=')+1)

        Args.Message.channel.send(`${ur}${ur2? ` | https://www.roblox.com/library/${ur2}` : ''}`)

    })

}



exports.Class = new classes.Command(Execute, {


    name: 'getasset',
    memberName: 'getasset',
    desc: 'gets "image" of asset',
    guildOnly: false,
    throt: {
        Usage: 999,
        Dur: 0
    },
    args: [
        new classes.CommandArg({

            name: 'AssetID',
            type: 'string',
            needed: true,
            pos: 0,
            prefix: ''
        }),
    ]


})