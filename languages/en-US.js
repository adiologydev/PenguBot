const { Language, util } = require("klasa");

module.exports = class extends Language {

    constructor(...args) {
        super(...args);
        this.language = {
            INHIBITOR_DISABLED: "<:penguError:435712890884849664> ***This command is currently disabled***",
            INHIBITOR_DISABLED_GROUP: "<:penguError:435712890884849664> ***This command group is currently disabled***",
            COMMAND_UNLOAD: (type, name) => `<:penguSuccess:435712876506775553> Unloaded ${type}: ${name}`,
            COMMAND_TRANSFER_ERROR: "<:penguError:435712890884849664> That file has been transfered already or never existed.",
            COMMAND_RELOAD: (type, name) => `<:penguSuccess:435712876506775553> Reloaded ${type}: ${name}`,
            COMMAND_RELOAD_ALL: type => `<:penguSuccess:435712876506775553> Reloaded all ${type}.`,
            COMMAND_LOAD: (time, type, name) => `<:penguSuccess:435712876506775553> Successfully loaded ${type}: ${name}. (Took: ${time})`,
            COMMAND_LOAD_ERROR: (type, name, error) => `<:penguError:435712890884849664> Failed to load ${type}: ${name}. Reason:${util.codeBlock("js", error)}`,
            COMMAND_INVITE: client => [
                `**👉 | Invite PenguBot to your Discord Guild:**`,
                `<${client.invite}>`
            ],
            COMMAND_SUPPORT: `**__PenguBot Support Guild__**\n• **Invite Link:** https://discord.gg/u8WYw5r`,
            COMMAND_INVITE_DESCRIPTION: "Displays the join server link of the bot.",
            COMMAND_INFO: [
                "**__PenguBot Information__**",
                "PenguBot is a Multi-Purpose Discord Bot which is filled with features ranging from",
                "Moderation, Fun, Utilities and more. It is developed in NodeJS using many different",
                "technologies such as RethinkDB, JavaScript and Linux.",
                "",
                "• **Author:** [AdityaTD#5346](https://www.AdityaTD.me)",
                "",
                "**__General Information__**",
                `• **Version:** ${this.client.config.main.version}`,
                "• **Website:** <https://www.PenguBot.com>",
                "• **Patreon:** <https://www.Patreon.com/PenguBot>",
                "• **Discord Guild:** <https://discord.gg/6KpTfqR>",
                "• **GitHub:** <https://www.github.com/AdityaTD/PenguBot>",
                "• **Database:** RethinkDB"
            ],
            COMMAND_DONATE: [
                "**__Support PenguBot__**",
                "PenguBot runs on multipe servers rented out across the globe and that requires the",
                "rent.If you'd like to support PenguBot and it's financial costs please visit the following:",
                "",
                "• **Patreon:** https://www.patreon.com/PenguBot",
                "• **Crypto Donations:** https://1upcoin.com/donate/adityatd",
                "• **PenguBot's Donation Page:** https://www.PenguBot.com/donate"
            ],
            COMMAND_HELP_NODM: "📪 | You have DMs disabled, I couldn't send you the commands in DMs so here's a link to all the commands: <https://www.pengubot.com/commands>",
            COMMAND_UPVOTE: ["**__Vote for PenguBot__**",
                "Want PenguBot to become bigger and be available in more guilds you visit?",
                "Then vote for PenguBot via the link below and also unlock access to",
                "limited features that only upvoters can have access to!",
                "",
                "• **Vote:** https://discordbots.org/bot/PenguBot/vote"],
            COMMAND_TOGGLE_GROUP_DESCRPTION: "Disable/Enable Command Categories.",
            COMMAND_TOGGLE_COMMAND_DESCRPTION: "Disable/Enable Commands in your guild.",
            COMMAND_SUPPORT_DESCRIPTION: "Link to join PenguBot's Support Guild.",

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
            MESSAGE_DJ_ADD: "is now a Pengu DJ!",
            MESSAGE_DJ_REMOVE: "is no longer a Pengu DJ!",

            // Mute Command Messages
            MESSAGE_MUTED: "was muted!",
            MESSAGE_UNMUTED: "was un-muted!",

            // Other Mod Commands Messages
            MESSAGE_PRUNE_DELETED: "message(s) were deleted!",

            // Custom Commands Messages
            MESSAGE_CMD_ADDED: "command was added by",
            MESSAGE_CMD_UPDATED: "command was updated by",
            MESSAGE_CMD_REMOVED: "command was removed by",
            MESSAGE_CMD_NOTFOUND: "command was not found!",
            MESSAGE_CMD_EXISTS: "command with this name already exists in Pengu as a default or custom command!",
            MESSAGE_NO_CMDS: "Your guild has no custom commands, ask an admin or above to make one!",
            MESSAGE_COMMAND_CUSTOM_ENABLED: "Custom Commands are now Enabled!",
            MESSAGE_COMMAND_CUSTOM_DISABLED: "Custom Commands are now Disabled!",

            // Welcome & Leave messages
            MESSAGE_WLCM_ENABLED: "Welcome Messages are now Enabeld!",
            MESSAGE_WLCM_DISABLED: "Welcome Messages are now Disabled!",
            MESSAGE_LEAVE_ENABLED: "Leave Messages are now Enabeld!",
            MESSAGE_LEAVE_DISABLED: "Leave Messages are now Disabled!",
            MESSAGE_WELCOME_SET: "Welcome message has now been set!",
            MESSAGE_LEAVE_SET: "Leave message has now been set!",
            MESSAGE_WELCOME_CHANNEL_SET: "Welcome messages channel has now been set!",
            MESSAGE_LEAVE_CHANNEL_SET: "Leave messages channel has now been set!",

            // Logging
            MESSAGE_LOGCHAN_SET: "Logging channel has now been set!",
            COMMAND_LOG_DESCRPTION: "Enable/Disable Logging events if you're Pengu Admin or above.",

            // Autoroles Messages
            MESSAGE_AUTOROLES_ENABLED: "Auto Roles have been enabled in this guild!",
            MESSAGE_AUTOROLES_DISABLED: "Auto Roles have been disabled in this guild!",
            MESSAGE_AUTOROLE_REMOVED: "role was removed from the Auto Roles!",
            MESSAGE_AUTOROLE_ADDED: "role was added in the Auto Roles!",

            // Utilities Messages
            MESSAGE_NEW_REMINDER: "New Reminder has been created with ID:",
            MESSAGE_LINK_SHORTEN: "Here's your Short URL:",
            MESSAGE_AVATAR: "Here's the avatar of",
            MESSAGE_AFK_TRUE: "Set your status to Away From Keyboard!",
            MESSAGE_AFK_FALSE: "Set your status to no longer Aaway From Keyboard!",
            MESSAGE_IS_AFK: "is currently AFK for:",
            MESSAGE_AFK_REMOVED: "was removed from the AFK status!",
            MESSAGE_STARCHAN_SET: "Starboard channel has now been set.",

            // Pengu's Commands Descriptions
            COMMAND_KICK_DESCRIPTION: "Allows moderators and above to kick users.",
            COMMAND_BAN_DESCRIPTION: "Allows moderators and above to ban users.",
            COMMAND_SOFTBAN_DESCRIPTION: "Allows moderators and above to softban users.",
            COMMAND_MAKE_ADMIN_DESCRIPTION: "Allows guild managers, admins and pengu admins to add new pengu admins.",
            COMMAND_MAKE_MOD_DESCRIPTION: "Allows guild managers, admins and pengu admins to add new pengu mods.",
            COMMAND_MUTE_DESCRIPTION: "Allows Pengu Moderators and above to Mute people.",
            COMMAND_SAY_DESCRIPTION: "Allows Pengu Moderators and above to make Pengu say stuff.",
            COMMAND_ADD_CMD_DESCRIPTION: "Allows Pengu Administrators and above to add custom commands to the guild.",
            COMMAND_TOGGLE_CUSTOM_DESCRIPTION: "Allows Pengu Administrators and above to enable or disable custom commands in the guild.",
            COMMAND_TOGGLE_WELCOME_DESCRPTION: "Allows Pengu Administrators and above to enable or disable welcome messages in the guild.",
            COMMAND_TOGGLE_LEAVE_DESCRPTION: "Allows Pengu Administrators and above to enable or disable welcome messages in the guild.",
            COMMAND_SET_WELCOME_DESCRPTION: "Allows Pengu Administrators and above set welcome messages in the guild.",
            COMMAND_SET_LEAVE_DESCRPTION: "Allows Pengu Administrators and above set leave messages in the guild.",
            COMMAND_CHANNEL_WELCOME_DESCRPTION: "Allows Pengu Administrators and above set welcome messages channel in the guild.",
            COMMAND_CHANNEL_LEAVE_DESCRPTION: "Allows Pengu Administrators and above set leave messages channel in the guild.",
            COMMAND_TOGGLE_ROLES_DESCRPTION: "Allows Pengu Administrators and above to enable or disable Auto Roles.",
            COMMAND_ADD_ROLES_DESCRPTION: "Allows Pengu Administrators and above to add new Auto Roles.",
            COMMAND_REMIND_DESCRIPTION: "Make Pengu remind you things so you don't forget.",
            COMMAND_SHORTEN_DESCRIPTION: "Let Pengu shorten your Long URLs in one simple command.",
            COMMAND_AFK_DESCRIPTION: "Set yourself AFK with a reason so other's know!",
            COMMAND_DEL_CMD_DESCRIPTION: "Allows Pengu Administrators and above to delete a custom command made previously.",
            COMMAND_LIST_CMDS_DESCRIPTION: "List all custom commands made in a guild.",
            COMMAND_TOGGLE_CUSTOM_DESCRPTION: "Allows Pengu Administrators and above to enable or disable custom commands in a guild.",
            COMMAND_MUTE_DESCRPTION: "Allows Pengu Moderators and above to Mute a person in the guild",
            COMMAND_PRUNE_DESCRIPTION: "Allows Pengu Moderators and above to Bulk Delete messages in a guild with filters.",
            COMMAND_MAKE_ADMIN_DESCRPTION: "Allows Administrators and Guild Owners to create new Pengu Admins.",
            COMMAND_MAKE_MODS_DESCRPTION: "Allows Pengu Admins and above to create new Pengu Mods.",
            COMMAND_PREFIX_DESCRIPTION: "Allows Pengu Admins and above to change a guild's prefix for PenguBot.",
            COMMAND_SHARDS_DESCRIPTION: "Check all the detailed shards information of PenguBot.",
            COMMAND_LMGTFY_DESCRIPTION: "Feeling lazy to google something? Let me google it for you.",
            COMMAND_UPVOTE_DESCRIPTION: "Vote for PenguBot on DBL and gain access to limited features in a second.",

            // Fun Commands Descriptions
            COMMAND_CAT_DESCRIPTION: "Cute Cat Photos and Facts with Pengu!",
            COMMAND_CHUCK_DESCRIPTION: "Chuck Norris Jokes just a command away!",
            COMMAND_COMPLIMENT_DESCRIPTION: "Be nice and compliment some people out there with Pengu!",
            COMMAND_COOKIE_DESCRIPTION: "Mouth watering Cookie pictures to make you even more hungry!",
            COMMAND_DADJOKE_DESCRIPTION: "Everyone loves jokes but what about some Dad Jokes?",
            COMMAND_DOG_DESCRIPTION: "Cute Doggo Pictures to make your day!",
            COMMAND_FML_DESCRIPTION: "Things which has made people say FML!",
            COMMAND_HUG_DESCRIPTION: "Someone needs a hug? Why wait, just give it!",
            COMMAND_PENGU_DESCRIPTION: "The Cute OG Pengu Pictures!",
            COMMAND_8BALL_DESCRIPTION: "Ask the magical 8ball your questions!",
            COMMAND_DICE_DESCRIPTION: "Roll a dice and get an outcome with Pengu!",
            COMMAND_INSULT_DESCRIPTION: "Don't be nice and insult a fellow guild member!",
            COMMAND_KISS_DESCRIPTION: "Get naughty and just kiss the person!",
            COMMAND_PUNCH_DESCRIPTION: "Someone's being naughty? Give them a strong punch!",
            COMMAND_COMIC_DESCRIPTION: "The OG Kids would still remember comics, it's for them!",
            COMMAND_FACT_DESCRIPTION: "Educate Yourself with Pengu!",
            COMMAND_RPS_DESCRIPTION: "Ever wanted to compete against Pengu in Rock, Paper, Scissors, the greatest eSport of all time? Now you can!",
            COMMAND_SLOTS_DESCRIPTION: "I don't promote gambling but you can if you want because I can!",
            COMMAND_TRUMP_DESCRIPTION: "Get Trumped by Trump Insults!",
            COMMAND_MOMMA_DESCRIPTION: "Still not tired of Yo Momma jokes? We got more, don't you worry!",
            COMMAND_FOX_DESCRIPTION: "Love foxes? Me too! Here's a picture of a fox.",
            COMMAND_ILLEGAL_DESCRIPTION: "Let's make things illegal by making trump sign the bills for it.",
            COMMAND_MCA_DESCRIPTION: "Generate yourself a Minecraft Achievement image because My Craft...",
            COMMAND_LIO_DESCRIPTION: "Add yours or other people's face on to the cute lio!",
            COMMAND_SLAP_DESCRIPTION: "Who's being naughty? Give them a tight slap!",
            COMMAND_PAT_DESCRIPTION: "Someone did a good job? Give them a pat.",
            COMMAND_CUDDLE_DESCRIPTION: "Cuddle in, it's time to relax, everything's gonna be fine.",
            COMMAND_TICKLE_DESCRIPTION: "Who's being tough on surface? Tickle them and make them laugh!",
            COMMAND_POKE_DESCRIPTION: "Ping someone by poking them!",
            COMMAND_FEED_DESCRIPTION: "Anyone hungry? Feed them some food.",
            COMMAND_BATSLAP_DESCRIPTION: "Be a Bat Man and slap someone!",
            COMMAND_BEAUTIFUL_DESCRIPTION: "Admire your or someone else's avatar.",
            COMMAND_FACEPALM_DESCRIPTION: "*sigh* facepalm where you have to.",
            COMMAND_RIP_DESCRIPTION: "Pay someone their final respect.",
            COMMAND_SUPERPUNCH_DESCRIPTION: "Become a superman and give someone an even stronger punch!",
            COMMAND_TATTOO_DESCRIPTION: "Ever wanted your avatar being tatted on someone else? Here you have it.",
            COMMAND_TRIGGERED_DESCRIPTION: "Because getting trigerred is a lot easier now...",
            COMMAND_WANTED_DESCRIPTION: "Print some Wanted posters of who is wanted by the sherrif department.",
            COMMAND_VAULT_DESCRIPTION: "Be the ICONIC Vault boy or make someone else be one.",
            COMMAND_GARBAGE_DESCRIPTION: "Garbage someone because they're trash.",
            COMMAND_APPROVED_DESCRIPTION: "Give someone a seal of approval",
            COMMAND_REJECT_DESCRIPTION: "Reject someone, their quality isn't upto the mark.",
            COMMAND_TINDER_DESCRIPTION: "You Have a Match, let's match you with someone!",
            COMMAND_MISSING_DESCRIPTION: "Has your dear one went missing? Get them a poster.",
            COMMAND_SNAPCHAT_DESCRIPTION: "Create a Snapchat Meme Image.",

            // NSFW Commands
            COMMAND_ANAL_DESCRIPTION: "-NOT SAFE FOR WORK- Anal images.",
            COMMAND_BOOBS_DESCRIPTION: "-NOT SAFE FOR WORK- Boobs images.",
            COMMAND_BOOTY_DESCRIPTION: "-NOT SAFE FOR WORK- Booty images.",
            COMMAND_PUSSY_DESCRIPTION: "-NOT SAFE FOR WORK- Pussy images.",
            COMMAND_TEEN_DESCRIPTION: "-NOT SAFE FOR WORK- Teen images.",
            COMMAND_SNAP_DESCRIPTION: "-NOT SAFE FOR WORK- Snapchat Images.",
            COMMAND_AMETEUR_DESCRIPTION: "-NOT SAFE FOR WORK- Ameteur Images.",
            COMMAND_GIFS_DESCRIPTION: "-NOT SAFE FOR WORK- Animated Gifs.",
            COMMAND_GWNSFW_DESCRIPTION: "-NOT SAFE FOR WORK- Gone Wild Images.",
            COMMAND_LESB_DESCRIPTION: "-NOT SAFE FOR WORK- Lesbian Images.",
            COMMAND_MILF_DESCRIPTION: "-NOT SAFE FOR WORK- MILF images.",
            COMMAND_NEKOS_DESCRIPTION: "-NOT SAFE FOR WORK- Nekos Images.",

            // Utilities Commands
            COMMAND_GUILDINFO_DESCRIPTION: "Get brief information about a guild with this command.",
            COMMAND_TWSTATS_DESCRIPTION: "Check Twitch Statistics live on the go.",
            COMMAND_URBAN_DESCRIPTION: "Find meanings of words on Urban Dictionary.",
            COMMAND_USERINFO_DESCRIPTION: "Get brief user information in a single command.",
            COMMAND_WEATHER_DESCRIPTION: "Get weather of your area easily and in a fun way.",
            COMMAND_YTSTATS_DESCRIPTION: "Check YouTube Statistics live on the go.",
            COMMAND_ADBLOCK_DESCRIPTION: "Enable/Disable Auto Deletion of Invite Links. Pengu Mods and above can bypass this.",
            COMMAND_TRANSLATE_DESCRIPTION: "Translate a sentence or message to any selected language.",
            COMMAND_POLL_DESCRIPTION: "Create a Strawpoll using PenguBot",
            COMMAND_LOGCHAN_DESCRPTION: "Select a Channel Where you want to Log Events.",
            COMMAND_AVATAR_DESCRIPTION: "Get Avatar URL of Yourself or Someone else.",
            COMMAND_QUOTE_DESCRIPTION: "Quote a message with it's Message ID.",

            // Profile Commands
            COMMAND_LEVELUP_DESCRIPTION: "Enable/Disable Level Up Announcements of Users in your guild.",
            COMMAND_REP_DESCRIPTION: "Give your valuable rep point to someone to make them feel special.",
            COMMAND_PROFILE_DESCRIPTION: "Check yours or other users fancy profiles!",
            COMMAND_DAILY_DESCRIPTION: "Claim your daily 100 Snowflakes which you can use to buy cosmetics.",
            COMMAND_TITLE_DESCRIPTION: "Set your title which will be visible in your profile.",
            COMMAND_SNOWFLAKES_DESCRIPTION: "Check your Snowflakes or send your Snowflakes to others.",
            COMMAND_BGBUY_DESCRIPTION: "Buy backgrounds for your Pengu Profile.",
            COMMAND_CHANGEBG_DESCRIPTION: "Change your Pengu Profile's Background.",
            COMMAND_LEADERBOARD_DESCRIPTION: "See who is winning the leaderboard for your guild.",
            COMMAND_BACKGROUND_DESCRIPTION: "Customize your PenguBot profile by buying and choosing different backgrounds.",

            // Dev Commands
            COMMAND_EXEC_DESCRIPTION: "-BOT OWNER ONLY-",
            COMMAND_SG_DESCRIPTION: "-BOT OWNER ONLY-",
            COMMAND_TPG_DESCRIPTION: "-BOT OWNER ONLY-",
            COMMAND_DONATE_DESCRIPTION: "Donate to PenguBot and help make something awesome!",

            // Music Commands
            COMMAND_DMSONG_DESCRIPTION: "Make Pengu send you the current song in your DMs.",
            COMMAND_LOOP_DESCRIPTION: "Loop a song so it repeats when it finishes playing.",
            COMMAND_LYRICS_DESCRIPTION: "Get a song's lyrics directly with Pengu.",
            COMMAND_MUSIC_DESCRIPTION: "Detailed information for all Music Commands.",
            COMMAND_NOWPLAYING_DESCRIPTION: "Know which song is currently playing and what is it's progress.",
            COMMAND_PLAY_DESCRIPTION: "Play Songs from YouTube/Twitch/SoundCloud/Mixer/Live Streams, etc. with Pengu.",
            COMMAND_SHUFFLE_DESCRIPTION: "Shuffle songs in the queue to be randomized.",
            COMMAND_QUEUE_DESCRIPTION: "See the current song queue in an interactive manner",
            COMMAND_SKIP_DESCRIPTION: "Skip the current song or call a vote skip if there are more than 3 members in the VC.",
            COMMAND_STOP_DESCRIPTION: "Stop and Clear the queue if you're Pengu-DJ or are the only one listening.",
            COMMAND_MAKE_DJ_DESCRPTION: "Make a user Pengu DJ if you are Pengu Mod or above.",
            COMMAND_LEAVE_DESCRIPTION: "Make Pengu forcefully leave your Voice Channel.",
            COMMAND_PAUSE_DESCRIPTION: "Pause/Resume the currently playing music.",
            COMMAND_VOLUME_DESCRIPTION: "Change the default volume of Pengu in your guild",
            COMMAND_DJONLY_DESCRIPTION: "Toggle Pengu DJ only mode for Music Commands.",
            INHIBITIOR_DJ_ONLY: "<:penguError:435712890884849664> ***This guild is configured to allow only Pengu DJ's to use Music Commands.***",

            // Game Stats
            COMMAND_FORTNITE_DESCRIPTION: "Get Fortnite Game Statistics within Discord.",
            COMMAND_CRSTATS_DESCRIPTION: "Clash Royale Player Statistics within Discord.",
            COMMAND_COCSTATS_DESCRIPTION: "Clash of Clans Player Statistics within Discord.",

            // Starboard
            COMMAND_TOGGLE_STARBOARD_DESCRPTION: "Allows Pengu Administrators and above to toggle Starboard in the guild.",
            COMMAND_CHANNEL_STAR_DESCRPTION: "Allows Pengu Administrators and above to set a Starboard channel.",
            COMMAND_REQUIRED_STAR_DESCRPTION: "Allows Pengu Administrators and above to set minimum stars before Starboard message.",
            COMMAND_STAR_DESCRPTION: "Allows Pengu Moderators and above to force Starboard a message.",
            MESSAGE_STAR_ENABLED: "Starboard has now been enabled.",
            MESSAGE_STAR_DISABLED: "Starboard has now been disabled.",
            MESSAGE_STARS_REQUIRED_SET: "Set the minimum Stars required before a message is sent to Starboard.",
            MESSAGE_STAR_CHANNEL_SET: "Successfully set the Starboard channel."
        };
    }

    async init() {
        await super.init();
    }

};
