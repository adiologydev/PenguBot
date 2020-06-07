const { Command, config, MessageEmbed, Duration } = require("../../index");

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
        const data = await this.fetchURL(`https://osu.ppy.sh/api/get_user`, { type: "json", query: { k: config.apis.osu, u: encodeURIComponent(username) } }).then(a => a[0]).catch(() => null);
        if (!data) return msg.reply(msg.language.get("CMD_OSU_ERR"));
        const embed = new MessageEmbed()
            .setThumbnail(`https://a.ppy.sh/${data.user_id}`)
            .setColor("#EF5E9F")
            .setAuthor(data.username, `https://a.ppy.sh/${data.user_id}`, "https://pengubot.com")
            .addField("Total Score", Number(data.total_score).toLocaleString(), true)
            .addField("Ranked Score", Number(data.ranked_score).toLocaleString(), true)
            .addField("Level", Number(data.level).toFixed(0).toLocaleString(), true)
            .addField("Count 50", Number(data.count50).toLocaleString(), true)
            .addField("Count 100", Number(data.count100).toLocaleString(), true)
            .addField("Count 300", Number(data.count300).toLocaleString(), true)
            .addField("Global Rank", Number(data.pp_rank).toLocaleString(), true)
            .addField("SS Rank", Number(data.count_rank_ss).toLocaleString(), true)
            .addField("SSH Rank", Number(data.count_rank_ssh).toLocaleString(), true)
            .addField("S Rank", Number(data.count_rank_s).toLocaleString(), true)
            .addField("A Rank", Number(data.count_rank_a).toLocaleString(), true)
            .addField("Accuracy", `${Number(data.accuracy).toFixed(2)}%`, true)
            .addField("Time Played", Duration.toNow(Date.now() - (data.total_seconds_played * 1000)), true)
            .setFooter("© PenguBot.com");
        return msg.channel.send({ embed });
    }

};
