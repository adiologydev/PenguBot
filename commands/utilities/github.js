const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");

module.exports = class GitHubCMD extends Command {

    constructor(client) {
        super(client, {
            name: "github",
            group: "utilities",
            memberName: "github",
            description: "github",
            usage: ["<prefix>github"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "github",
                prompt: "What do you want Pengu to search on Github?\n",
                type: "string"
            }],
            guildOnly: false
        });
    }

    async run(msg, { github }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const repo = safeRepo(github);
        if (github.indexOf("/") !== -1) {
            const mess = await msg.reply(`🔄 Loading info for '${repo}'...`);
            get(`https://api.github.com/repos/${repo}`)
                .then((res) => {
                    const embed = new RichEmbed().setDescription(getInfo(res.body));
                    mess.edit(`✅ | **Github Results**`, { embed });
                }).catch((err) => {
                    mess.edit("❌ | No results found, please try again.");
                    console.log(err);
                });
        } else {
            const search = await msg.reply(`🔄 Searching for '${github}'...`);

            get(`https://api.github.com/search/repositories?q=${github.replace(/ /g, "+")}`)
                .then((res) => {
                    const json = res.body;
                    if (json.total_count < 1) {
                        search.edit(`❌ | No results found for \`${github}\`, please try again.`);
                    }
                    json.items.slice(0, 2).forEach(item => {
                        const embed = new RichEmbed().setDescription(getInfo(item)).setColor("#6cc644").setTimestamp().setFooter("© PenguBot").setThumbnail("https://i.imgur.com/jPyikTN.png");
                        search.edit({ embed });
                    });
                }).catch(err => {
                    console.log(err);
                    search.edit(`❌ | An error has occured! \`${err.name}: ${err.message}\`\nTry again later.`);
                });
        }
    }

};

function safeRepo(input) {
    const user = input.substr(0, input.indexOf("/"));
    input = input.substr(input.indexOf("/") + 1);
    const repo = input.indexOf("/") === -1 ? input : input.substr(0, input.indexOf("/"));
    return `${user}/${repo}`;
}

function getInfo(json) {
    return `**${json.full_name}**
\t**Description:** _${json.description || "None provided"}_
\t**Owner:** [${json.owner.login}](${json.owner.html_url})
\t**Primary Language:** \`${json.language}\`
\t🏠  [Home page](${json.html_url})  :small_red_triangle_down:  [Downloads](${json.html_url}/releases)  :exclamation:  [Issues](${json.html_url}/issues)
\t❎  \`${json.open_issues_count}\` open issues  ⭐  \`${json.stargazers_count}\` stargazers  👀  \`${json.subscribers_count || json.watchers_count}\` watchers
\tDo \`git clone ${json.clone_url}\` to clone this repository
`;
}
