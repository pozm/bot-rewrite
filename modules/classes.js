exports.Command = class {

    constructor(func, {
        name,
        desc,
        alias,
        memberName,
        guildOnly,
        userPerms,
        throt,
        args,
        ownerOnly,
        level,
        hidden
    }) {
        this.Name = name
        this.desc = desc
        this.alias = alias ? alias : []
        this.memberName = memberName ? memberName : name
        this.guildOnly = guildOnly
        this.userPerms = userPerms ? userPerms : null
        this.throt = null
        this.args = args ? args : []
        this.ownerOnly = ownerOnly ? ownerOnly : false
        this.Execute = func
        this.Level = level ? level : 0
        this.Hidden = hidden ? hidden : false
    }
}

exports.Data = class {

    constructor(work,ret) {


        this.Worked = work ? work : true
        this.Returned = ret ? ret : null

    }

}

exports.CommandArg = class {

    constructor({

        name,
        type,
        pos,
        perms,
        prefix,
        needed,
        setcontent

    }) {

        this.Name = name
        this.Type = type
        this.Pos = typeof(pos) == 'number' ? [pos] : pos
        this.Perms = perms ? perms : null
        this.Prefix = prefix ? prefix : null
        this.Needed = needed? needed :false
        this.SetContent = setcontent ? setcontent : false

    }


}