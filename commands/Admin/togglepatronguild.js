const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["tpg"],
            hidden: true,
            permissionLevel: 10,
            usage: "<guild:string>",
            description: language => language.get("COMMAND_TPG_DESCRIPTION")
        });
    }

    async run(msg, [guild]) {
        const exists = this.client.settings.pGuilds.includes(guild);
        await this.client.settings.update("pGuilds", guild);
        return msg.sendMessage(`${exists ? "**Removed Guild:**" : "**Added Guild:**"} ${guild}`);
    }

};
