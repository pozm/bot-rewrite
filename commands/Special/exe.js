const classes = require('../../modules/classes')
const discord = require('discord.js')
const data = require('../../modules/DataHandler')
const fm = require('../../modules/FunctionModules')
const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

Execute = async function (bot,Args) {

    console.log(Args.Prams.code.arg)

    try {
        const code = Args.Prams.code.arg
        let evaled = await eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        Args.Message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        Args.Message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }


}


exports.Class = new classes.Command(Execute, {


    name: 'exe',
    memberName: 'exe',
    desc: 'Execute code.',
    guildOnly: false,
    throt: {
        Usage: 999,
        Dur: 0
    },
    ownerOnly : true,
    hidden : true,
    args: [
        new classes.CommandArg({

            name : 'code',
            type : 'string',
            needed : true,
            pos : 'all',
            prefix : ''
        })
    ]


})