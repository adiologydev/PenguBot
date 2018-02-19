const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class CleanCommand extends Command {

    constructor(client) {
        super(client, {
            name: "clean",
            aliases: ["purge", "prune"],
            group: "moderation",
            memberName: "clean",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Clear the chat by deleting specified messages.",
            details: `Deletes messages. Here is a list of filters:
				__invites:__ Messages containing an invite.
				__user @user:__ Messages sent by <@user>.
				__bots:__ Messages sent by bots.
				__uploads:__ Messages containing an attachment.
				__links:__ Messages containing a URL.`,
            guildOnly: true,

            args: [
                {
                    key: "limit",
                    prompt: "How many messages do you want to remove?\n",
                    type: "integer",
                    max: 100
                },
                {
                    key: "filter",
                    prompt: "Which filters will you like to use?\n",
                    type: "string",
                    default: ""
                },
                {
                    key: "member",
                    prompt: "Whose messages are you willing to delete?\n",
                    type: "member",
                    default: ""
                }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("MANAGE_MESSAGES") || msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { limit, filter, member }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const botMember = await msg.guild.fetchMember(msg.client.user);

        const BotNoPerm = new Discord.RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Manage Roles" permission. Please give me that before using this command.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const NoMention = new Discord.RichEmbed()
            .addField("Error", "You did not mention anyone. Please do it so I can remove their messages.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const InvalidFilter = new Discord.RichEmbed()
            .addField("Invalid Filter", 'The filter you gave is invalid. Do "p!help clean" for all available filters.')
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (!botMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.embed(BotNoPerm);
        limit = limit === 100 ? 99 : limit;
        filter = filter.toLowerCase();
        let messageFilter;

        if (filter) {
            if (filter === "invite" || "invites") {
                messageFilter = message => message.content.search(/(discord\.gg\/.+|discordapp\.com\/invite\/.+|discord\.me\/.+|discord\.io\/.+)/i) !== -1;
            } else if (filter === "user") {
                if (member) {
                    const { user } = member;
                    messageFilter = message => message.author.id === user.id;
                } else {
                    return msg.embed(NoMention);
                }
            } else if (filter === "bots") {
                messageFilter = message => message.author.bot;
            } else if (filter === "you") {
                messageFilter = message => message.author.id === message.client.user.id;
            } else if (filter === "upload") {
                messageFilter = message => message.attachments.size !== 0;
            } else if (filter === "links") {
                messageFilter = message => message.content.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1; // eslint-disable-line no-useless-escape
            } else {
                return msg.embed(InvalidFilter);
            }
        }

        if (!filter) {
            const messagesToDelete = await msg.channel.fetchMessages({ limit: limit + 1 }).catch(() => null);
            msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(() => null);
        } else {
            const messages = await msg.channel.fetchMessages({ limit: limit + 1 }).catch(() => null);
            const messagesToDelete = messages.filter(messageFilter);
            msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(() => null);
        }
    }

};

process.on("unhandledRejection", err => { console.error(`Uncaught Promise Error: \n${err.stack}`); });
