const { Command } = require("klasa");
const logger = require("../../utils/log");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:user>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        const user = await msg.guild.members.fetch(member.id);

        if (user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***You can not mute yourself...***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***Why would you want to mute Pengu?***`);

        if (!msg.guild.roles.find("name", "PENGU_MUTED")) {
            await msg.guild.roles.create({
                data: {
                    name: "PENGU_MUTED",
                    permissions: ["READ_MESSAGES"]
                }
            });
        }

        const role = msg.guild.roles.find("name", "PENGU_MUTED");

        if (user.roles.exists("id", role.id)) {
            await user.roles.remove(role).catch(console.error);
            msg.guild.channels.forEach(async c => {
                await c.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`);
            });
            const log = logger("ban", msg.guild, `🔈 **${member.tag}** (${member.id}) was \`unmuted\` by **${msg.author.tag}** (${msg.author.id})`);
            const loggingChannel = msg.guild.channels.get(msg.guild.configs.loggingChannel);
            if (log) loggingChannel.sendEmbed(log);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await user.roles.add(role).catch(console.error);
            msg.guild.channels.forEach(async c => {
                await c.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`);
            });
            const log = logger("ban", msg.guild, `🔇 **${member.tag}** (${member.id}) was \`muted\` by **${msg.author.tag}** (${msg.author.id})`);
            const loggingChannel = msg.guild.channels.get(msg.guild.configs.loggingChannel);
            if (log) loggingChannel.sendEmbed(log);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_MUTED")}***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("mute")) {
            this.client.gateways.guilds.schema.logs.add("mute", { type: "boolean", default: false });
        }
    }

};
