const Discord = require("discord.js");
const config = require("../modules/config")
const Lm = require("../modules/LoadingHandle")
const Fm = require("../modules/FunctionModules")
const Dh = require('../modules/DataHandler')

module.exports = async (bot) => {
    ow = await Fm.GetOwners(bot)
    console.log(`\nBot <${bot.user.username}> is now online\nBuild: ${testMode ? 'Test' : 'Default'}\nVersion: ${Discord.version}@${process.version}\nOwner(s):${ow}\n`)
}