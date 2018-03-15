const { CommandoClient } = require("discord.js-commando");
const readdir = require("util").promisify(require("fs").readdir);
const MySQL = require("mysql2/promise");
const MySQLProvider = require("./util/mysqlprovider.js");
const path = require("path");

class PenguClient extends CommandoClient { //eslint-disable-line
  constructor(options) { //eslint-disable-line
        super(options);
        this.functions = require("./util/functions.js");
        this.config = require("./config.json");
        this.Util = new (require("./util/Util"));
        this.cmdRun = {};
        this.player = null;
        this.queue = new Map();
        this.db = null;
    }

}
const client = new PenguClient({
    commandPrefix: "p!",
    owner: ["136549806079344640"],
    unknownCommandResponse: false,
    invite: "https://discord.gg/u8WYw5r",
    disableEveryone: true,
    messageCacheMaxSize: 150,
    messageCacheLifetime: 4600,
    messageSweepInterval: 2800,
    disabledEvents: [
        "RELATIONSHIP_REMOVE",
        "RELATIONSHIP_ADD",
        "TYPING_START",
        "USER_SETTINGS_UPDATE",
        "USER_NOTE_UPDATE",
        "MESSAGE_REACTION_REMOVE_ALL",
        "MESSAGE_REACTION_REMOVE",
        "MESSAGE_REACTION_ADD",
        "MESSAGE_DELETE_BULK",
        "GUILD_SYNC",
        "CHANNEL_PINS_UPDATE"],
    commandEditableDuration: 15
});
// MySQL Connection for database
MySQL.createConnection({
    host: client.config.DBIP,
    user: client.config.DBUSER,
    password: client.config.DBPASS,
    database: client.config.DBDATABASE
}).then((db, err) => {
    if (err) throw err;
    client.setProvider(new MySQLProvider(db)).then(console.log("Database Connected! Hurray!")); // eslint-disable-line
    client.login(client.config.BOT_TOKEN);
    module.exports.database = db;
    client.db = db;
    setInterval(() => db.query('SELECT 1').catch(error => client.emit('error', error)), 60000); // eslint-disable-line
}).catch(console.log);

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["core", "Core Commands"],
        ["fun", "Fun Commands"],
        ["moderation", "Moderation Commands"],
        ["personal", "Personal Commands"],
        ["music", "Music Commands"],
        ["utilities", "Utility Commands"],
        ["nsfw", "Not Safe For Work (NSFW) Commands"],
        ["developers", "Developer Only Commands"],
        ["misc", "Misc commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands"));

const init = async () => {
    try {
        const evtFiles = await readdir("./events/");
        console.log(`Loading a total of ${evtFiles.length} events.`);
        evtFiles.forEach(file => {
            const eventName = file.split(".")[0];
            const event = require(`./events/${file}`);
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
        });
    } catch (e) {
        console.error("Error in init function", e);
    }
};
init();
process.on("unhandledRejection", error => console.log(`unhandledRejection:\n${error.stack}`))
    .on("uncaughtException", error => console.log(`uncaughtException:\n${error.stack}`))
    .on("error", error => console.log(`Error:\n${error.stack}`))
    .on("warn", error => console.log(`Warning:\n${error.stack}`));
