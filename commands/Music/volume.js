const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["changevol", "setvolume"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_VOLUME_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[volume:integer]"
        });
        this.music = true;
    }

    async run(msg, [volume]) {
        if (!volume) return msg.sendMessage(`🔈 | ***Guild's Current Music Volume is:*** ${msg.guild.configs.musicVolume}`);
        if (!msg.hasAtLeastPermissionLevel(3)) return msg.reply("<:penguError:435712890884849664> You are not a **Pengu DJ** to change the volume.");
        if (volume <= 100 || volume >= 0) {
            await msg.guild.configs.update("musicVolume", volume);
            if (this.client.queue.get(msg.guild.id)) this.client.queue.get(msg.guild.id).volume = volume;
            if (this.client.lavalink.get(msg.guild.id)) await this.client.lavalink.get(msg.guild.id).volume(volume);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Volume has been set to:*** ${volume}`);
        } else {
            return msg.sendMessage(`<:penguError:435712890884849664> ***Volume can not be lower than 0 or higher than 100.***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("musicVolume")) {
            this.client.gateways.guilds.schema.add("musicVolume", { type: "integer", default: 90, configurable: false });
        }
        if (!this.client.gateways.guilds.schema.permissions.has("dj")) {
            this.client.gateways.guilds.schema.permissions.add("dj", { type: "user", array: true });
        }
    }

};
