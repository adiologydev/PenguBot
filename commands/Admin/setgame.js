const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            usageDelim: " ",
            subcommands: true,
            aliases: ["sg"],
            permissionLevel: 10,
            usage: "<text|stream> <game:string> [...]",
            description: language => language.get("COMMAND_SG_DESCRIPTION")
        });
    }

    async text(msg, [...game]) {
        await this.client.shard.broadcastEval(`this.user.setPresence({ activity: { name: '${game.join(" ")}', status: "online" }})`);
        return msg.sendMessage(`**Playing status has been changed to:** ${game.join(" ")}`);
    }

    async stream(msg, [...game]) {
        await this.client.shard.broadcastEval(`this.user.setPresence({ activity: { name: '${game.join(" ")}', type: "STREAMING", status: "online", url: "https://twitch.tv/AdityaTD" }})`);
        return msg.sendMessage(`**Playing status has been changed to:** ${game.join(" ")}`);
    }

};
