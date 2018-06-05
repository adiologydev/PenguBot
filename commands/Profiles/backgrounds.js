const { Command, RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");
const list = [{ c: 1, n: "Default", i: "https://i.imgur.com/8DJtnYh.png", p: "FREE" },
    { c: 2, n: "Sunset Palms", i: "https://i.imgur.com/V5HQd0F.png", p: 1000 },
    { c: 3, n: "Cherry Blossoms", i: "https://i.imgur.com/16OiRLK.png", p: 1000 },
    { c: 4, n: "Butterflies", i: "https://i.imgur.com/czaPXgo.png", p: 1000 },
    { c: 5, n: "Sunset Tree", i: "https://i.imgur.com/Wa7YNAP.png", p: 1250 },
    { c: 6, n: "Birdie", i: "https://i.imgur.com/TxtlYGz.png", p: 1250 },
    { c: 7, n: "Tracks", i: "https://i.imgur.com/UaOHTeg.png", p: 1500 },
    { c: 8, n: "Stars", i: "https://i.imgur.com/nKTku3d.png", p: 1500 },
    { c: 9, n: "People", i: "https://i.imgur.com/IfN42Lu.png", p: 1850 },
    { c: 10, n: "Courtyard", i: "https://i.imgur.com/8t3lmXK.png", p: 2000 }];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            subcommands: true,
            aliases: ["background", "profilebg", "bgs", "bg"],
            usage: "<view|buy|change> [key:string]",
            description: msg => msg.language.get("COMMAND_BACKGROUND_DESCRIPTION"),
            usageDelim: " "
        });
    }

    async view(msg, [key]) {
        await msg.author.configs._syncStatus;
        // If All Backgrounds
        if (!key) {
            const userbg = msg.author.configs.backgrounds;
            const bgs = new RichDisplay(new MessageEmbed()
                .setTitle("Use 'p!bgs view all' to view names, id's and prices of all available backgrounds")
                .setAuthor("Profile Backgrounds You Own - PenguBot", "https://i.imgur.com/oq9kgaR.png")
                .setDescription("Scroll between pages to see the profile backgrounds list you own. 'p!bgs view all' to view all available backgrounds you can buy and purchase.")
                .setColor("#F75F4E")
            );

            for (let i = 0, temp = userbg.length; i < temp; i += 5) {
                const curr = userbg.slice(i, i + 5);
                bgs.addPage(t => t.setDescription(curr.map(c => `• ${c}`)));
            }

            bgs.run(await msg.sendMessage("<a:penguLoad:435712860744581120> Loading List..."), {
                time: 120000,
                filter: (reaction, user) => user === msg.author
            });
        } else if (key.toLowerCase() === "all") {
            const bgs = new RichDisplay(new MessageEmbed()
                .setTitle("Use Command: `p!bgs buy ID` to buy a background and `p!bgs change ID` to change it")
                .setAuthor("All Profile Backgrounds - PenguBot", "https://i.imgur.com/oq9kgaR.png")
                .setDescription("Scroll between pages to see the profile backgrounds list.")
                .setColor("#F75F4E")
            );

            for (const bg of list) {
                bgs.addPage(t => t
                    .setImage(bg.i)
                    .setDescription(`**ID:** ${bg.c} | **Name:** ${bg.n} | **Price:** ${bg.p}`));
            }

            bgs.run(await msg.sendMessage("<a:penguLoad:435712860744581120> Loading List..."), {
                time: 120000,
                filter: (reaction, user) => user === msg.author
            });
        } else {
            return msg.reply("Invalid option, please type `p!bg view all` to view all the backgrounds available.");
        }
    }

    async buy(msg, [key]) {
        await msg.author.configs._syncStatus;
        const id = parseInt(key);
        switch (id) {
            case 1: return msg.reply("You already own this background.");
            case 2: await this.process(msg, "sunset-palms", 1000);
                break;
            case 3: await this.process(msg, "cherry-blossoms", 1000);
                break;
            case 4: await this.process(msg, "butterflies", 1000);
                break;
            case 5: await this.process(msg, "sunset-tree", 1250);
                break;
            case 6: await this.process(msg, "birdie", 1250);
                break;
            case 7: await this.process(msg, "tracks", 1500);
                break;
            case 8: await this.process(msg, "stars", 1500);
                break;
            case 9: await this.process(msg, "people", 1850);
                break;
            case 10: await this.process(msg, "courtyard", 2000);
                break;
            default: return msg.reply("Invalid ID, please view all backgrounds you can purchase by using the command `p!bgs view all`.");
        }
    }

    async change(msg, [key]) {
        await msg.author.configs._syncStatus;
        const id = parseInt(key);
        switch (id) {
            case 1: await this.changeBG(msg, "default");
                break;
            case 2: await this.changeBG(msg, "sunset-palms");
                break;
            case 3: await this.changeBG(msg, "cherry-blossoms");
                break;
            case 4: await this.changeBG(msg, "butterflies");
                break;
            case 5: await this.changeBG(msg, "sunset-tree");
                break;
            case 6: await this.changeBG(msg, "birdie");
                break;
            case 7: await this.changeBG(msg, "tracks");
                break;
            case 8: await this.changeBG(msg, "stars");
                break;
            case 9: await this.changeBG(msg, "people");
                break;
            case 10: await this.changeBG(msg, "courtyard");
                break;
            default: return msg.reply("Invalid ID, please view all backgrounds you can purchase and their IDs by using the command `p!bgs view all`.");
        }
    }

    async process(msg, name, price) {
        await msg.author.configs._syncStatus;
        if (this.checkOwnership(msg, name)) return msg.reply("You already own this background.");
        if (!this.checkBalance(msg, price)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
        await this.updateOwnership(msg, name, price);
    }

    async changeBG(msg, name) {
        await msg.author.configs._syncStatus;
        if (!this.checkOwnership(msg, name)) return msg.reply("You do not own this background, please buy it using `p!bg buy ID` first.");
        if (this.compareBackground(msg, name)) return msg.reply("That is already your current background, please choose another one.");
        await this.updateBG(msg, name);
    }

    checkOwnership(msg, name) {
        if (msg.author.configs.backgrounds.includes(name)) return true;
        return false;
    }

    compareBackground(msg, name) {
        if (msg.author.configs.get("profilebg") === name) return true;
        return false;
    }

    checkBalance(msg, price) {
        if (msg.author.configs.snowflakes >= price) return true;
        return false;
    }

    async updateOwnership(msg, name, price) {
        await msg.author.configs.update(["snowflakes", "backgrounds", "profilebg"], [msg.author.configs.snowflakes - price, name, name]);
        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***You just bought and set your background to \`${name}\` for ${price} Snowflakes.***`);
    }

    async updateBG(msg, name) {
        await msg.author.configs.update("profilebg", name);
        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Your Profile Background is now set to: \`${name}\`***`);
    }

};
