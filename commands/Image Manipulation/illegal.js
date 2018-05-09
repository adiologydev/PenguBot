const { Command } = require("klasa");
const snekfetch = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["isnowillegal", "trumpillegal"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_ILLEGAL_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<name:string> [...]"
        });
    }

    async run(msg, [...name]) {
        const text = name.join(" ").toUpperCase();
        if (/^[a-zA-Z0-9 ]+$/g.test(text) && text.length < 11) {
            try {
                let gif = await this.fetchGIF(text);
                if (!gif) {
                    const w = await msg.channel.send("<a:penguLoad:435712860744581120> Hang on tight, let Trump do his job!");
                    await this.createGIF(text);
                    gif = await this.fetchGIF(text);
                    if (!gif) return w.edit("<:penguError:435712890884849664> You got Trumped, no bill for you! Try again.");
                    await w.delete();
                }
                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setImage(gif)
                    .setFooter("© PenguBot.cc");
                return msg.sendEmbed(embed);
            } catch (err) {
                return msg.reply(`<:penguError:435712890884849664> Oh no, an error occurred: \`${err.message}\`. Please try again later!`);
            }
        } else {
            return msg.channel.send("<:penguError:435712890884849664> Invalid Input, please enter 10 or fewer characters. (A-Z, 0-9)");
        }
    }

    async createGIF(text) {
        const { body } = await snekfetch
            .post("https://is-now-illegal.firebaseio.com/queue/tasks.json")
            .send({
                task: "gif",
                word: text
            });
        await new Promise(resolve => setTimeout(resolve, 5000));
        if (!body) return null;
        return body;
    }

    async fetchGIF(text) {
        const { body } = await snekfetch.get(`https://is-now-illegal.firebaseio.com/gifs/${text}.json`);
        if (!body) return null;
        return body.url;
    }

};
