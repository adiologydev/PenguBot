const { Command } = require("discord.js-commando");
// const cheerio = require("cheerio"),
//     snekfetch = require("snekfetch");
// const { RichEmbed } = require("discord.js");

module.exports = class GoogleCMD extends Command {

    constructor(client) {
        super(client, {
            name: "google",
            group: "utilities",
            aliases: ["googlesearch", "search", "searchgoogle"],
            memberName: "google",
            description: "Make Pengu search on Google.",
            usage: ["<prefix>google <your search message>"],
            throttling: {
                usages: 1,
                // 6 hours
                duration: 21600
            },
            /*             args: [{
                key: "searchterm",
                prompt: "What do you want Pengu to search on Google?\n",
                type: "string"
            }], */
            guildOnly: false
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.channel.send(`❌ | This command is temporarily disabled because a Pengu tripped on a wire.`);
        /*     // Await msg blah blah
        const searchMessage = await msg.reply("🔄 Searching, give me a sec.");
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchterm)}`;
        const result = await snekfetch.get(searchUrl).catch((err) => {
            searchMessage.edit("❌ | No results found, please try again.");
            console.log(err);
        });
        const $ = cheerio.load(result.body);
        // Get all results
        const results = [];
        $(".g").each((i) => {
            results[i] = {};
        });
        // get the link
        $(".g>.r>a").each((i, e) => {
            const raw = e.attribs.href;
            results[i].link = decodeURIComponent(raw.substr(7, raw.indexOf("&sa=U") - 7));
        });
        // Description
        $(".g>.s>.st").each((i, e) => {
            results[i].description = getText(e);
        });
        // Whole output
        const output = results.filter(r => r.link && r.description)
            .slice(0, 3)
            .map(r => `**▫ URL:** <${r.link}>\n\`\`\`${r.description}\`\`\``)
            .join("\n");

        const colors = ["#00c965", "#4280e5", "#df5d53", "#ffc352", "#e3e3e3"];

        const embed = new RichEmbed()
            .setAuthor("Google Search - PenguBot", this.client.user.avatarURL)
            .setThumbnail("https://i.imgur.com/kn6brKf.png")
            .setDescription(`✅ | **Google Search Results For:** ${searchterm}\n${output}`)
            .setTimestamp()
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            .setFooter("© PenguBot");

        searchMessage.edit({ embed }); */
    }

};
// const getText = (children) => {
//     if (children.children) return getText(children.children);
//     return children.map(c => c.children ? getText(c.children) : c.data).join("");
// };
