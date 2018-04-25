const { Command, RichDisplay, Timestamp } = require("klasa");
const Vibrant = require("node-vibrant");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["stopmusic", "leave"],
            permLevel: 0,
            botPerms: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_SHUFFLE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });

        this.songLenght = new Timestamp("HH:mm:ss");
    }

    async run(msg) {
        const output = [];
        const queue = this.client.queue.get(msg.guild.id);
        const player = this.client.lavalink.get(msg.guild.id);
        if (!queue || !player) return msg.channel.send("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const pages = new RichDisplay(new this.client.methods.Embed()
            .setTitle("Use the reactions to change pages, select a page or stop viewing the queue.")
            .setAuthor("Queue - PenguBot", "https://i.imgur.com/IS8hX4t.png")
            .setDescription("Scroll between pages to see the song queue.")
        );

        for (let i = 0, temp = queue.songs.length; i < temp; i++) {
            const id = this.linkStringToIds(queue[i].url);
            const img = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            const v = new Vibrant(img);
            const c = await v.getPalette();
            const pal = c.Vibrant._rgb;
            output[i] = [
                pages.addPage(template =>
                    template.addField(`The songs position on the queue is: ${String(i + 1).padStart(2, 0)}`, `[${queue[i].name.replace(/\*/g, "\\*")}](${queue[i].url}) (${this.songLenght.display()})`)
                        .setColor(this.toHex(pal[0], pal[1], pal[2]))
                        .setImage(img)
                )
            ];
        }
        pages.run(await msg.sendMessage("Loading Queue..."), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

    static linkStringToIds(str) {
        // assumes all ids will match [a-z0-9-_]
        let matches;
        const accumulator = [];
        const re = /.*?(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([a-z0-9-_]*).*?/gi;
        if (!str) { throw new Error("input string was empty"); }

        while ((matches = re.exec(str)) !== null) {
            if (matches.index === re.lastIndex) { re.lastIndex++; }
            if (matches[1] && matches[1].length > this.minLen && matches[1].length < this.maxLen) { accumulator.push(matches[1]); }
        }
        return accumulator;
    }

    static toHex(red, green, blue, alpha) {
        const isPercent = (red + (alpha || "")).toString().includes("%");

        if (typeof red === "string") {
            const res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
            red = res[0];
            green = res[1];
            blue = res[2];
            alpha = res[3];
        } else if (alpha !== undefined) {
            alpha = parseFloat(alpha);
        }

        if (typeof red !== "number" ||
            typeof green !== "number" ||
            typeof blue !== "number" ||
            red > 255 ||
            green > 255 ||
            blue > 255) {
            throw new TypeError("Expected three numbers below 256");
        }

        if (typeof alpha === "number") {
            if (!isPercent && alpha >= 0 && alpha <= 1) {
                alpha = Math.round(255 * alpha);
            } else if (isPercent && alpha >= 0 && alpha <= 100) {
                alpha = Math.round(255 * alpha / 100);
            } else {
                throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
            }
            alpha = (alpha | 1 << 8).toString(16).slice(1);
        } else {
            alpha = "";
        }

        return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
    }

};

