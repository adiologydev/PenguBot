const Command = require("../../../lib/structures/KlasaCommand");
const { RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            requiredPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_ROLES"],
            aliases: ["selfrole"],
            cooldown: 5,
            permissionLevel: 0,
            description: language => language.get("COMMAND_SELFROLES"),
            extendedHelp: "No extended help available.",
            usage: "<add|remove|list> [role:rolename]",
            usageDelim: " ",
            subcommands: true
        });
    }

    async list(msg) {
        const { roles } = msg.guild.settings.selfroles;
        if (!roles.length) return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("CMD_NO_SELFROLES")}***`);
        const pages = new RichDisplay(new MessageEmbed()
            .setTitle("Use the reactions to change pages, select a page, or stop viewing the roles")
            .setAuthor("Self Roles - PenguBot", msg.author.displayAvatarURL())
            .setDescription("Scroll between pages to see the self assignable roles.")
            .setColor("#428bca")
        );
        pages.addPage(t => t.setDescription(roles.map(role => `\`-\` ${msg.guild.roles.get(role) || "Role Removed"}`).join("\n")));

        pages.run(await msg.sendMessage(`${this.client.emotes.loading} ***Loading Roles...***`), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

    async add(msg, [role]) {
        const { roles } = msg.guild.settings.selfroles;
        if (!roles || !role) return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("CMD_NO_SELFROLES")}***`);
        if (!roles.includes(role.id)) return msg.sendMessage(`${this.client.emotes.cross} ***That given role is not self assignable do \`${msg.guildSettings.prefix}selfroles list\` to know all the self assignable roles.***`);

        const myRole = msg.guild.me.roles.find(r => r.managed);
        if (role.position > myRole.positon) return msg.sendMessage(`${this.client.emotes.cross} ***That given role is above my role in the guild, please change the order.***`);
        if (msg.member.roles.has(role)) return msg.sendMessage(`${this.client.emotes.cross} ***You already have that role do \`${msg.guildSettings.prefix}selfroles remove ${role.name}\` to remove it.***`);
        const assigned = await msg.member.roles.add(role, "Self Assigned").catch(() => null);
        if (!assigned) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error, please try again later.***`);
        return msg.sendMessage(`${this.client.emotes.check} ***The role has been assigned.***`);
    }

    async remove(msg, [role]) {
        const { roles } = msg.guild.settings.selfroles;
        if (!roles || !role) return msg.sendMessage(`${this.client.emotes.cross} ***This guild does not have any self assignable roles or you didn't mention any.***`);
        if (!roles.includes(role.id)) return msg.sendMessage(`${this.client.emotes.cross} ***That given role is not self assignable do \`${msg.guildSettings.prefix}selfroles list\` to know all the self assignable roles.***`);

        const myRole = msg.guild.me.roles.find(r => r.managed);
        if (role.position > myRole.positon) return msg.sendMessage(`${this.client.emotes.cross} ***That given role is above my role in the guild, please change the order.***`);
        if (!msg.member.roles.has(role.id)) return msg.sendMessage(`${this.client.emotes.cross} ***You don't have that role do \`${msg.guildSettings.prefix}selfroles add ${role.name}\` to add it.***`);
        const assigned = await msg.member.roles.remove(role, "Self Deassigned").catch(() => null);
        if (!assigned) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error, please try again later.***`);
        return msg.sendMessage(`${this.client.emotes.cross} ***The role has been deassigned.***`);
    }

};
