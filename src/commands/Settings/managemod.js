const Command = require("../../lib/structures/KlasaCommand");
const { Role, MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setmod", "makemod", "managemoderators"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MAKE_MOD_DESCRPTION"),
            usage: "<add|remove|list> [member:membername|role:rolename]",
            usageDelim: " ",
            subcommands: true,
            extendedHelp: "No extended help available."
        });
    }

    async add(msg, [memberOrRole]) {
        if (!memberOrRole) return msg.sendMessage(`${this.client.emotes.cross} ***Member or Role has not been specified or invalid.***`);

        const type = memberOrRole instanceof Role ? "role" : "member";
        if (type === "member") {
            if (msg.guild.settings.get("users.mod").includes(memberOrRole)) return msg.sendMessage(`${this.client.emotes.cross} ***That user is already a Moderator, try another user or removing them first.***`);
            const { errors } = await msg.guild.settings.update("users.mod", memberOrRole.id);
            if (errors) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error: \`${errors[0]}\`***`);
            return msg.sendMessage(`${this.client.emotes.check} ***${memberOrRole} has been added as a Moderator.***`);
        }
        if (type === "role") {
            if (msg.guild.settings.get("roles.mod") === memberOrRole.id) return msg.sendMessage(`${this.client.emotes.cross} ***That role is already a Moderator, try another role or removing it first.***`);
            const { errors } = await msg.guild.settings.update("roles.mod", memberOrRole.id, msg.guild);
            if (errors) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error: \`${errors[0]}\`***`);
            return msg.sendMessage(`${this.client.emotes.check} ***${memberOrRole.name} role has been added as a Moderator.***`);
        }
    }

    async remove(msg, [memberOrRole]) {
        if (!memberOrRole) return msg.sendMessage(`${this.client.emotes.cross} ***Member or Role has not been specified or invalid.***`);

        const type = memberOrRole instanceof Role ? "role" : "member";
        if (type === "member") {
            if (!msg.guild.settings.get("users.mod").includes(memberOrRole.id)) return msg.sendMessage(`${this.client.emotes.cross} ***That user is not a Moderator, try another user or adding them first.***`);
            const { errors } = await msg.guild.settings.update("users.mod", memberOrRole.id);
            if (errors) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error: \`${errors[0]}\`***`);
            return msg.sendMessage(`${this.client.emotes.check} ***${memberOrRole} has been removed from Moderator.***`);
        }
        if (type === "role") {
            if (msg.guild.settings.get("roles.mod") !== memberOrRole.id) return msg.sendMessage(`${this.client.emotes.cross} ***That role is already a Moderator, try another role or adding it first.***`);
            const { errors } = await msg.guild.settings.reset("roles.mod");
            if (errors) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error: \`${errors[0]}\`***`);
            return msg.sendMessage(`${this.client.emotes.check} ***${memberOrRole.name} role has been removed as a Moderator.***`);
        }
    }

    async list(msg) {
        const role = msg.guild.settings.get("roles.mod");
        const users = msg.guild.settings.get("users.mod");

        return msg.sendMessage({ embed: new MessageEmbed()
            .setTimestamp()
            .setFooter("PenguBot.com")
            .setColor("#7cf062")
            .setAuthor("Moderators - PenguBot", this.client.user.displayAvatarURL())
            .setDescription([`${role ? `**Role:** ${msg.guild.roles.cache.get(role)}\n` : "**Role:** None\n"}`,
                `${users.length ? `**Members:**\n- <@${users.join("\n- <@")}>\n\n` : "**Members:** None"}`].join("\n")) });
    }

};
