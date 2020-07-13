const fs = require("fs");
const { promisify } = require("util")
const readdir = promisify(fs.readdir)
const Enmap = require("enmap")
const Discord = require("discord.js");
var bot = new Discord.Client({ disableEveryone: true });


const Commands = {}
const Aliases = {}

exports.GetLoaded = (t) => {

    return t == 'c' ? Commands : Aliases

}


async function initializeEvn(file, Existing) {

    if (file.split(".").slice(-1)[0] !== "js") return;
    delete require.cache[require.resolve(`../events/${file}`)];
    const evtName = file.split(".")[0];
    const event = require(`../events/${file}`);
    if (Existing) bot.removeAllListeners(evtName)
    console.log(`${Existing ? 'Re-initialized' : 'Initialized'} | `.bold.blue + `${evtName}`.italic.white + ` <Event>`.bold.blue)
    return bot.on(evtName, event.bind(null, bot));

}


async function initializeCmd(file, folder, update) {
    if (!file.endsWith(".js")) return;
    delete require.cache[require.resolve(`../commands/${folder}/${file}`)];
    let props = require(`../commands/${folder}/${file}`);
    let commandName = file.split(".")[0];
    let alias = null

    try {
        classf = props.Class
    } catch (e) {
        console.log(`Err with getting class : ${e.title}`)
    }

    console.log(`${update == true ? 'Updated' : 'Loaded'} | `.bold.blue + commandName.bold.red + ' - '.bold.blue + `#${folder}`.white);
    try {
        if (classf.alias) {
            classf.alias.forEach(function (element) {
                console.log(`${update == true ? 'Updated' : 'Loaded'} | `.bold.blue + element.bold.red + ` [Alias of ${commandName}]`.red + ' - '.bold.blue + `#${folder}`.white), Aliases.set(element, props)
            })
        }
    } catch (e) {
        console.log('class does not exist!')
    } finally {
        Commands[`${folder}_commands`].set(commandName, props);
    }
}



exports.load = async () => {

    if (Boolean(process.argv[2]) == true) testMode = true; else testMode = false


    if (testMode == true) await bot.login(process.env.TEST_DISCORD_TOKEN);
    else await bot.login(process.env.DISCORD_TOKEN);

    const evtFiles = await readdir("./events/");
    const cmdFiles = await readdir("./commands/");


    await cmdFiles.forEach(async folder => {
        if (!Commands[folder + '_commands']) Commands[folder + '_commands'] = new Enmap();

        console.log('Got '.bold.blue + folder.bold.magenta)

        await fs.readdir(`./commands/${folder}/`, async (err, files) => {
            if (err) return console.error(err);
            await files.forEach(async file => {
                await initializeCmd(file, folder)
                fs.watchFile(`./commands/${folder}/${file}`, () => initializeCmd(file, folder, true)

                )
            })

        });
    })


    await evtFiles.forEach(async file => {

        var evnt = await initializeEvn(file)

        fs.watchFile(`./events/${file}`, () => initializeEvn(file, evnt))
    })

};