const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["swc", "setwelcomechan"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[channel:channelname]",
            description: language => language.get("COMMAND_CHANNEL_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [channel = msg.channel]) {
        return this.dbQuery(msg, channel).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_WELCOME_CHANNEL_SET")}***`);
        });
    }

    async dbQuery(msg, channel) {
        const r = this.client.providers.default.db;
        const query = await r.table("guilds").get(msg.guild.id)
            .update({ channels: { join: channel.id } })
            .run()
            .catch(e => {
                console.error(`${this.name} error:\n${e}`);
                throw `There was an error, please contact us on our support server: <https://pengubot.com/support>\n${e}`;
            });

        await msg.guild.settings.sync(true);
        return query;
    }

};
