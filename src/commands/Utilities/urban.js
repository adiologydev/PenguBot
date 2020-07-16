const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 10,
            aliases: ["urband", "ud"],
            description: "Get meaning for a word from Urban Dictionary.",
            usage: "<word:...string>",
            nsfw: true
        });
    }

    async run(msg, [word]) {
        const info = await this.getDefinition(word);

        return msg.sendEmbed(new MessageEmbed()
            .setAuthor(`Word: ${info.word}`, info.link)
            .setDescription(`**Definition:** ${info.definition}`)
            .setColor("RANDOM")
            .setFooter("Urban Dictionary", this.client.user.displayAvatarURL())
            .addField("Votes", `👍 ${info.thumbsUp} **|** 👎 ${info.thumbsDown}`, true)
            .addField("Example", info.example, true));
    }

    async getDefinition(term) {
        const { list: [word] } = await this.fetchURL(`http://api.urbandictionary.com/v0/define`, { query: { term } });

        if (!word) throw "No entry found";

        return {
            definition: word.definition.length >= 1984 ? `${word.definition.substr(0, 1984)}...` : word.definition,
            word: word.word,
            link: word.permalink,
            thumbsUp: word.thumbs_up,
            thumbsDown: word.thumbs_down,
            example: word.example,
            author: word.author
        };
    }

};
