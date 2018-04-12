const { Language, util } = require("klasa");

module.exports = class extends Language {

    constructor(...args) {
        super(...args);
        this.language = {
            // Klasa's Default Sentences.
            DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
            DEFAULT_LANGUAGE: "Default Language",
            SETTING_GATEWAY_EXPECTS_GUILD: "The parameter <Guild> expects either a Guild or a Guild Object.",
            SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
            SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
            SETTING_GATEWAY_SPECIFY_VALUE: "You must specify the value to add or filter.",
            SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
            SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
            SETTING_GATEWAY_INVALID_TYPE: "The type parameter must be either add or remove.",
            RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
            RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
            RESOLVER_INVALID_MSG: (name) => `${name} must be a valid message id.`,
            RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user id.`,
            RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
            RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel id.`,
            RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji id.`,
            RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
            RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or role id.`,
            RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
            RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
            RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
            RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
            RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
            RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
            RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
            RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
            RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
            RESOLVER_STRING_SUFFIX: " characters",
            RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
            RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
            RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
            RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
            REACTIONHANDLER_PROMPT: "Which page would you like to jump to?",
            COMMANDMESSAGE_MISSING: "Missing one or more required arguments after end of input.",
            COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} is a required argument.`,
            COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles})`,
            COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn't match any of the possibilities: (${possibles})`,
            MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **"ABORT"** to abort this prompt.`, // eslint-disable-line max-len
            MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **"CANCEL"** to cancel this prompt.`, // eslint-disable-line max-len
            MONITOR_COMMAND_HANDLER_ABORTED: "Aborted",
            INHIBITOR_COOLDOWN: (remaining) => `You have just used this command. You can use this command again in ${remaining} second${remaining === 1 ? "" : "s"}.`,
            INHIBITOR_DISABLED: "This command is currently disabled",
            INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
            INHIBITOR_NSFW: "You may not use NSFW commands in this channel.",
            INHIBITOR_PERMISSIONS: "You do not have permission to use this command",
            INHIBITOR_REQUIRED_CONFIGS: (configs) => `The guild is missing the **${configs.join(", ")}** guild setting${configs.length !== 1 ? "s" : ""} and thus the command cannot run.`,
            INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels`,
            INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,
            COMMAND_BLACKLIST_DESCRIPTION: "Blacklists or un-blacklists users and guilds from the bot.",
            COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
                usersAdded.length ? `**Users Added**\n${util.codeBlock("", usersAdded.join(", "))}` : "",
                usersRemoved.length ? `**Users Removed**\n${util.codeBlock("", usersRemoved.join(", "))}` : "",
                guildsAdded.length ? `**Guilds Added**\n${util.codeBlock("", guildsAdded.join(", "))}` : "",
                guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock("", guildsRemoved.join(", "))}` : ""
            ].filter(val => val !== "").join("\n"),
            COMMAND_EVAL_DESCRIPTION: "Evaluates arbitrary Javascript. Reserved for bot owner.",
            COMMAND_EVAL_EXTENDEDHELP: [
                "The eval command evaluates code as-in, any error thrown from it will be handled.",
                "It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.",
                "The --silent flag will make it output nothing.",
                "The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
                "The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword",
                "The --showHidden flag will enable the showHidden option in util.inspect.",
                "If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission."
            ].join("\n"),
            COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
            COMMAND_UNLOAD: (type, name) => `<:penguCheck1:431440099675209738> Unloaded ${type}: ${name}`,
            COMMAND_UNLOAD_DESCRIPTION: "Unloads the klasa piece.",
            COMMAND_TRANSFER_ERROR: "<:penguCross:432966551746904071> That file has been transfered already or never existed.",
            COMMAND_TRANSFER_SUCCESS: (type, name) => `<:penguCheck1:431440099675209738> Successfully transferred ${type}: ${name}`,
            COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
            COMMAND_TRANSFER_DESCRIPTION: "Transfers a core piece to its respective folder",
            COMMAND_RELOAD: (type, name) => `<:penguCheck1:431440099675209738> Reloaded ${type}: ${name}`,
            COMMAND_RELOAD_ALL: (type) => `<:penguCheck1:431440099675209738> Reloaded all ${type}.`,
            COMMAND_RELOAD_DESCRIPTION: "Reloads a klasa piece, or all pieces of a klasa store.",
            COMMAND_REBOOT: "Rebooting...",
            COMMAND_REBOOT_DESCRIPTION: "Reboots the bot.",
            COMMAND_LOAD: (time, type, name) => `<:penguCheck1:431440099675209738> Successfully loaded ${type}: ${name}. (Took: ${time})`,
            COMMAND_LOAD_FAIL: "The file does not exist, or an error occurred while loading your file. Please check your console.",
            COMMAND_LOAD_ERROR: (type, name, error) => `<:penguCross:432966551746904071> Failed to load ${type}: ${name}. Reason:${util.codeBlock("js", error)}`,
            COMMAND_LOAD_DESCRIPTION: "Load a piece from your bot.",
            COMMAND_PING: "Ping?",
            COMMAND_PING_DESCRIPTION: "Runs a connection test to Discord.",
            COMMAND_PINGPONG: (diff, ping) => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
            COMMAND_INVITE_SELFBOT: "Why would you need an invite link for a selfbot...",
            COMMAND_INVITE: (client) => [
                `**👉 | Invite PenguBot to your Discord Guild:**`,
                `<${client.invite}>`
            ],
            COMMAND_INVITE_DESCRIPTION: "Displays the join server link of the bot.",
            COMMAND_INFO: [
                "**__PenguBot Information__**",
                "PenguBot is a Multi-Purpose Discord Bot which is filled with features ranging from",
                "Moderation, Fun, Utilities and more. It is developed in NodeJS using many different",
                "technologies such as MongoDB, JavaScript and Linux.",
                "",
                `• **Version:** ${this.client.config.main.version}`,
                "• **Website:** <https://www.PenguBot.cc>",
                "• **Patreon:** <https://www.Patreon.com/PenguBot>",
                "• **Discord Guild:** <https://discord.gg/6KpTfqR>",
                "• **GitHub:** <https://www.github.com/AdityaTD/PenguBot>",
                "• **Database:** MongoDB"
            ],
            COMMAND_INFO_DESCRIPTION: "Provides some information about this bot.",
            COMMAND_HELP_DESCRIPTION: "Display help for a command.",
            COMMAND_HELP_NO_EXTENDED: "No extended help available.",
            COMMAND_HELP_DM: "📥 | The list of commands you have access to has been sent to your DMs.",
            COMMAND_HELP_NODM: "<:penguCross:432966551746904071> | You have DMs disabled, I couldn't send you the commands in DMs.",
            COMMAND_HELP_USAGE: (usage) => `usage :: ${usage}`,
            COMMAND_HELP_EXTENDED: "Extended Help ::",
            COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
            COMMAND_ENABLE_DESCRIPTION: "Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.",
            COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
            COMMAND_DISABLE_DESCRIPTION: "Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.",
            COMMAND_DISABLE_WARN: "You probably don't want to disable that, since you wouldn't be able to run any command to enable it again",
            COMMAND_CONF_NOKEY: "You must provide a key",
            COMMAND_CONF_NOVALUE: "You must provide a value",
            COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
            COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
            COMMAND_CONF_KEY_NOT_ARRAY: "This key is not array type. Use the action 'reset' instead.",
            COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
            COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
            COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
            COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
            COMMAND_CONF_SERVER_DESCRIPTION: "Define per-server configuration.",
            COMMAND_CONF_SERVER: (key, list) => `**Server Configuration${key}**\n${list}`,
            COMMAND_CONF_USER_DESCRIPTION: "Define per-user configuration.",
            COMMAND_CONF_USER: (key, list) => `**User Configuration${key}**\n${list}`,
            COMMAND_STATS: (memUsage, uptime, users, servers, channels, klasaVersion, discordVersion, processVersion, msg) => [
                "= PenguBot Statistics =",
                "",
                `• Memory Usage           :: ${memUsage} MB`,
                `• Uptime                 :: ${uptime}`,
                `• Users (Shard)          :: ${users}`,
                `• Servers/Guilds (Shard) :: ${servers}`,
                `• Channels (Shard)       :: ${channels}`,
                `• Discord.js Version     :: v${discordVersion}`,
                `• Node.js Version        :: ${processVersion}`,
                this.client.options.shardCount ? `• Shard                  :: ${((msg.guild ? msg.guild.shardID : msg.channel.shardID) || this.client.options.shardId) + 1} / ${this.client.options.shardCount}` : "",
                "",
                "= www.PenguBot.cc ="
            ],
            COMMAND_STATS_DESCRIPTION: "Provides some details about the bot and stats.",
            MESSAGE_PROMPT_TIMEOUT: "The prompt has timed out.",


            // Pengu's Sentences
            MESSAGE_PREFIX_SET: "Successfully updated the guild's prefix to:",
            MESSAGE_CURRENT_PREFIX: "Guild's current prefix is:",
            MESSAGE_PENGU: "here you go!",

            // Kick Messages
            MESSAGE_KICKED: "was kicked!",
            MESSAGE_KICK_YOURSELF: "You can not kick yourself!",
            MESSAGE_KICK_PENGU: "Why would you want to kick me?",
            MESSAGE_KICK_CANT: "This user can't be kicked.",

            // Ban Messages
            MESSAGE_BANNED: "was banned!",
            MESSAGE_SOFTBANNED: "was soft banned!",
            MESSAGE_BAN_YOURSELF: "You can not ban yourself!",
            MESSAGE_BAN_PENGU: "Why would you want to ban me?",
            MESSAGE_BAN_CANT: "This user can't be banned!",

            // Make Admin and Mod Messages
            MESSAGE_ADMIN_ADD: "is now a Pengu Admin!",
            MESSAGE_ADMIN_REMOVE: "is no longer a Pengu Admin!",
            MESSAGE_MOD_ADD: "is now a Pengu Moderator!",
            MESSAGE_MOD_REMOVE: "is no longer a Pengu Moderator!",

            // Mute Command Messages
            MESSAGE_MUTED: "was muted!",
            MESSAGE_UNMUTED: "was un-muted!",

            // Other Mod Commands Messages
            MESSAGE_PRUNE_DELETED: "message(s) were deleted!",

            // Custom Commands Messages
            MESSAGE_CMD_ADDED: "command was added by",
            MESSAGE_CMD_REMOVED: "command was removed by",
            MESSAGE_CMD_NOTFOUND: "command was not found!",
            MESSAGE_CMD_EXISTS: "command already exists!",
            MESSAGE_NO_CMDS: "Your guild has no custom commands, ask an admin or above to make one!",
            MESSAGE_LIST_CMDS: "Custom Commands for",
            MESSAGE_COMMAND_CUSTOM_ENABLED: "Custom Commands are now Enabled!",
            MESSAGE_COMMAND_CUSTOM_DISABLED: "Custom Commands are now Disabled!",

            // Pengu's Commands
            COMMAND_KICK_DESCRIPTION: "Allows moderators and above to kick users.",
            COMMAND_BAN_DESCRIPTION: "Allows moderators and above to ban users.",
            COMMAND_SOFTBAN_DESCRIPTION: "Allows moderators and above to softban users.",
            COMMAND_MAKE_ADMIN_DESCRIPTION: "Allows guild managers, admins and pengu admins to add new pengu admins.",
            COMMAND_MAKE_MOD_DESCRIPTION: "Allows guild managers, admins and pengu admins to add new pengu mods.",
            COMMAND_MUTE_DESCRIPTION: "Allows Pengu Moderators and above to Mute people.",
            COMMAND_SAY_DESCRIPTION: "Allows Pengu Moderators and above to make Pengu say stuff.",
            COMMAND_ADD_CMD_DESCRIPTION: "Allows Pengu Administrators and above to add custom commands to the guild.",
            COMMAND_TOGGLE_CUSTOM_DESCRIPTION: "Allows Pengu Administrators and above to enable or disable custom commands in the guild."
        };
    }

    async init() {
        await super.init();
    }

};
