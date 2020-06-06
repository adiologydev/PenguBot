const { Command, config, MessageEmbed, Timestamp } = require("../../index");
const timestamp = new Timestamp("HH[h] MM[n] SS[s]");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["osustats"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_OSU_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<username:str>"
        });
    }

    async run(msg, [username]) {
        const data = await this.fetchURL(`https://osu.ppy.sh/api/get_user`, { type: "json", query: { k: config.apis.osu, u: encodeURIComponent(username) } });
        if (!data) return msg.reply(msg.language.get("CMD_OSU_ERR"));
        const embed = new MessageEmbed()
            .setImage(`https://a.ppy.sh/${data.user_id}`)
            .setColor("#EF5E9F")
            .setAuthor(data.username, `https://a.ppy.sh/${data.user_id}`, "https://pengubot.com")
            .addField("Total Score", Number(data.total_score).toLocaleString(), true)
            .addField("Ranked Score", Number(data.ranked_score).toLocaleString(), true)
            .addField("Level", Number(data.level).toLocaleString(), true)
            .addField("Score 50", Number(data.score50).toLocaleString(), true)
            .addField("Score 100", Number(data.score100).toLocaleString(), true)
            .addField("Score 300", Number(data.score300).toLocaleString(), true)
            .addField("PP Rank", Number(data.pp_rank).toLocaleString(), true)
            .addField("SS Rank", Number(data.count_rank_ss).toLocaleString(), true)
            .addField("SSH Rank", Number(data.count_rank_ssh).toLocaleString(), true)
            .addField("S Rank", Number(data.count_rank_s).toLocaleString(), true)
            .addField("A Rank", Number(data.count_rank_a).toLocaleString(), true)
            .addField("Time Played", timestamp.display(new Date(data.total_seconds_played * 1000)), true)
            .addField("Accuracy", Number(data.accuracy).toFixed(2), true);
        return msg.channel.send({ embed });
    }

};
