const { MusicCommand, util: { haste } } = require("../../index");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireMusic: true,
            patronOnly: true,
            cooldown: 8,
            aliases: ["dumpplaylist", "savesongs", "save"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_DUMP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage(`${this.client.emotes.cross} ***There's currently no music playing!***`);

        const paste = await haste(JSON.stringify(music.queue));
        return msg.sendMessage(`${this.client.emotes.check} **Raw dump of current queue has been created:** ${paste}\n**Tip:** Save this URL to use with the \`play\` command to instantly load a queue.`);
    }

};
