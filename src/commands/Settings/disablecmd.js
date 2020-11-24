const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            hidden: true,
            aliases: ["enablecmd", "disablecommand", "enablecommand", "togglecommand"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_COMMAND_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (msg.guild.settings.get("disabledCommands").indexOf(cmd.name) === -1) {
            await this.dbQuery(msg, cmd, "add");
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.name} command has been Disabled by ${msg.author.tag}!***`);
        } else {
            await this.dbQuery(msg, cmd, "remove");
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.name} command has been Enabled by ${msg.author.tag}!***`);
        }
    }

    async dbQuery(msg, cmd, action) {
        const current = msg.guild.settings.get("disabledCommands");

        if (action === "add") {
            current.push(cmd.name);
        } else if (action === "remove") {
            const index = current.indexOf(cmd.name);
            if (index !== -1) current.splice(index, 1);
            else throw "The item does not exist in that array.";
        } else { throw "Invalid operation."; }

        const r = this.client.providers.default.db;
        const query = await r.table("guilds").get(msg.guild.id)
            .update({ disabledCommands: current })
            .run()
            .catch(e => {
                console.error(`${this.name} error:\n${e}`);
                throw `There was an error, please contact us on our support server: <https://pengubot.com/support>\n${e}`;
            });

        await msg.guild.settings.sync(true);
        return query;
    }

};
