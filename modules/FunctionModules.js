const Lm = require("./LoadingHandle")

exports.getCommandFromStr = (str) => {

    var Commands = Lm.GetLoaded('c')

    var Command

    var folder

    Object.entries(Commands).forEach(e => {

        if (e[1].has(str)) {

            return Command = e[1].get(str), folder = e[0].split('_')[0];
        }


    })

    return {cmd:Command,fldr:folder}

} 

exports.HasHigherPerms = (exec, other) => {

    if (exec.roles.highest.comparePositionTo( other.roles.highest ) > 0) return true

    return false


}


exports.getAllCommands = () => {


    return Lm.GetLoaded('c')

}

exports.saveModel = async (m) => {

    if ( await exports.GetData(m,m.id)) return null
    return m.save()


}

exports.GetData = async (collection, id) => {

    const { UserModel } = require('./DataHandler')
    if (collection == 'u') data = await UserModel.findOne({ id: id }); return data? data : null
}

exports.convert = async (str,type, m) => {

    var work = false
    var conv 

    switch (type)
    {
        case 'boolean': conv = Boolean(str); break;

        case 'number': conv = Number(str); break;
        
        case 'guildmember': conv = await this.getUserFromStr(str , m.guild, m); break;

        case 'string' : conv = String(str); break;
    }

    if (typeof conv == 'object') conv = conv[1]

    try {
        if (  conv.constructor.name.toLowerCase() == type ) work = true; //console.log(  conv.constructor.name.toLowerCase() )
    } catch(e) {

        if (typeof conv == type) work = true;

    }

    return [work,conv]

}

exports.asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

exports.GetOwners = async (bot) => {

    let config = require('./config')

    let arr = []

    if (typeof config.OwnerId == 'string') await arr.push( await bot.users.resolve(  await bot.users.fetch(config.OwnerId , true)).tag)
    else await exports.asyncForEach(config.OwnerId, async v => {usr = await bot.users.fetch(v, true); arr.push( bot.users.resolve(usr).tag ) } )

    return arr.join(' | ')

}

exports.IsOwner = (User) => {

    let config = require('./config')

    if ( typeof(config.OwnerId) == 'string' ) {

        if (User.id == config.OwnerId) return true

    } else {
        c = false
        config.OwnerId.forEach( (v) => {if (c) return; c = User.id == v ? true : false } )
        console.log(c)
        if (c) return true
    }


    return false
}


exports.getUserFromStr = async(str, guild, msg) => {

    if (! str) return [false, 'String is null.']

    res = []
    ret = [false]

    membs  = await guild.members.fetch()
    
    regx = new RegExp('\\b' + str.toLowerCase() + '?\\S+', 'gi')

    membs.forEach(e=> {

        matc = e.displayName.toString().toLowerCase().indexOf(str) >= 0? true : false

        if(! matc) matc = e.user.username.toString().toLowerCase().indexOf(str) >= 0? true : false

        if(! matc) if (str == e.user.id) matc = true

        if (matc) res.push(e.id + '_' + e.displayName)

    })
    if (res.length < 1) return [false, `Didn't get any results for "${str}"`]
    else if (res.length >2) {

        if(ret) return

        var mm = await msg.channel.send(`I got multiple "${str}"'s, Which one did you mean?\n${ res.map( e=> `${res.indexOf(e)}: ${ e.split('_')[1] }` ).join('\n') }`)

        var msgs = await msg.channel.awaitMessages( m=> m.author.id == msg.author.id & !isNaN(m.content) & Number(m.content) <= res.length, { max:1,time:25000 })

        mm.delete()

        msgs.array()[0].delete()
        return [true, await guild.members.fetch( res[msgs.array()[0]].split('_')[0] )]


    }
    else return [true, await guild.members.fetch(res[0].split('_')[0] )  ]

}