const { Command, MessageEmbed } = require("../../index");
const imageRegex = /<meta property="og:image" content="([^<]*)"\/>/;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 10,
            aliases: ["coronavirus", "covidstats", "covid19"],
            description: "Get Corona Virus Statistics.",
            usage: "[country:string]"
        });
    }

    async run(msg, [country]) {
        if (!country) {
            const res = await this.getData("all");

            return msg.sendEmbed(new MessageEmbed()
                .setAuthor(`COVID-19 Global Statistics`, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/COVID-19_Outbreak_World_Map.svg/800px-COVID-19_Outbreak_World_Map.svg.png", "https://pengubot.com")
                .setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/COVID-19_Outbreak_World_Map.svg/800px-COVID-19_Outbreak_World_Map.svg.png")
                .setDescription(`Use \`${msg.guild.settings.get("prefix")}covid <country>\` for country specific information`)
                .addField("Cases", `${res.cases.toLocaleString()} (${this.formatChange(res.todayCases)})`, true)
                .addField("Deaths", `${res.deaths.toLocaleString()} (${this.formatChange(res.todayDeaths)})`, true)
                .addField("Recovered", `${res.recovered.toLocaleString()} (${this.formatChange(res.todayRecovered)})`, true)
                .addField("Active", `${res.active.toLocaleString()}`, true)
                .addField("Critical", `${res.critical.toLocaleString()}`, true)
                .addField("Tests", `${res.tests.toLocaleString()}`, true)
                .addField("Population", `${res.population.toLocaleString()}`, true)
                .addField("Test Rate", `${((res.tests / res.population) * 100).toFixed(3)}%`, true)
                .addField("Infection Rate", `${((res.cases / res.population) * 100).toFixed(3)}%`, true)
                .setFooter(`PenguBot.com | Last Updated`)
                .setTimestamp(res.updated));
        }

        country = country.toUpperCase();
        const res = await this.getData(`countries/${country.toUpperCase()}`);

        const imagePrefix = ["United States", "Netherlands"].includes(res.country) ? `the_` : "";
        const wikiRes = await this.fetchURL(`https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_${imagePrefix}${res.country.replace("USA", "United States").replace(/ /g, "_")}`, { type: "text" }).catch(() => "");
        const imageLink = imageRegex.exec(wikiRes) ? `${imageRegex.exec(wikiRes)[1]}?newest=${res.updated}` : "";

        return msg.sendEmbed(new MessageEmbed()
            .setAuthor(`${res.country} - COVID-19 Statistics`, res.countryInfo.flag, "https://pengubot.com")
            .setThumbnail(res.countryInfo.flag)
            .addField("Cases", `${res.cases.toLocaleString()} (${this.formatChange(res.todayCases)})`, true)
            .addField("Deaths", `${res.deaths.toLocaleString()} (${this.formatChange(res.todayDeaths)})`, true)
            .addField("Recovered", `${res.recovered.toLocaleString()} (${this.formatChange(res.todayRecovered)})`, true)
            .addField("Active", `${res.active.toLocaleString()}`, true)
            .addField("Critical", `${res.critical.toLocaleString()}`, true)
            .addField("Tests", `${res.tests.toLocaleString()}`, true)
            .addField("Population", `${res.population.toLocaleString()}`, true)
            .addField("Test Rate", `${((res.tests / res.population) * 100).toFixed(3)}%`, true)
            .addField("Infection Rate", `${((res.cases / res.population) * 100).toFixed(3)}%`, true)
            .setFooter(`PenguBot.com | Last Updated`)
            .setImage(imageLink)
            .setTimestamp(res.updated));
    }

    async getData(route) {
        const data = await this.fetchURL(`https://disease.sh/v3/covid-19/${route}`).catch(() => null);
        if (!data) throw "There was an error trying to get information regarding your query, please try again and if the problem presists then please report at: https://discord.gg/u8WYw5r";

        return data;
    }

    formatChange(number) {
        if (number > 0) return `+${number.toLocaleString()}`;
        else if (number < 0) return `-${number.toLocaleString()}`;
        return 0;
    }

};
