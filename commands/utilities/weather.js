const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class WeatherCmd extends Command {

    constructor(client) {
        super(client, {
            name: "weather",
            aliases: ["currentweather", "w"],
            group: "utilities",
            memberName: "weather",
            description: "Get to know Weather Of A Place.",
            examples: ["<prefix>weather <location>"],
            throttling: {
                usages: 1,
                duration: 100
            },
            args: [{
                key: "location",
                prompt: "Please enter a place of where you want weather of.\n",
                type: "string"
            }]
        });
    }

    async run(msg, { location }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const locationURI = encodeURIComponent(location.replace(/ /g, "+"));
        const { body: response } = await get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationURI}&key=${this.client.config.GOOGLE_MAPS}`)
            .set("User-Agent", `PenguBot (http://www.pengu.ml)`);
        if (response.status !== "OK") return msg.reply(this.handleNotOK(msg, response.status));
        if (response.results.length === 0) return msg.reply("The given location was not found. Please try again.");

        const params = `${response.results[0].geometry.location.lat},${response.results[0].geometry.location.lng}`;

        const locality = response.results[0].address_components.find(loc => loc.types.includes("locality"));
        const governing = response.results[0].address_components.find(gov => gov.types.includes("administrative_area_level_1")); // eslint-disable-line max-len
        const country = response.results[0].address_components.find(cou => cou.types.includes("country"));
        const continent = response.results[0].address_components.find(con => con.types.includes("continent"));

        const city = locality || governing || country || continent || {};
        const state = locality && governing ? governing : locality ? country : {};
        const { body: res } = await get(`https://api.darksky.net/forecast/${this.client.config.WEATHER_API}/${params}`).set("User-Agent", `PenguBot (http://www.pengu.ml)`);
        const param1 = response.results[0].geometry.location.lat;
        const param2 = response.results[0].geometry.location.lng;
        const time = await get(`http://api.timezonedb.com/v2/get-time-zone?key=${this.client.config.TIMEZONE}&format=json&by=position&lat=${param1}&lng=${param2}`);
        const condition = res.currently.summary;
        const { icon } = res.currently.icon;
        const chanceofrain = Math.round((res.currently.precipProbability * 100) / 5) * 5;
        const temperature = Math.round(res.currently.temperature);
        const humidity = Math.round(res.currently.humidity * 100);
        const cityname = city.long_name ? city.long_name : "Unknown";
        const statename = state.long_name ? state.long_name : "Unknown";
        const flag = (s) => {
            if (s) return `:flag_${s.toLowerCase()}: | `;
            else return "";
        };

        return msg.channel.send(`
  **${flag(country.short_name)}Weather for ${cityname}, ${statename}, ${country.long_name}**
  **Weather:** ${this.getBase(icon)} ${condition}
  **Temperature :thermometer:: ** ${this.cToF(res.currently.temperature)} \xB0C | ${temperature} \xB0F
  **Humidity:** ${humidity}% | **Chances of Rain:** ${chanceofrain}%
  **Date/Time: **${require("moment")(time.body.formatted).format("dddd, MMMM Do YYYY, h:mm:ss A")}
  `);
    }

    cToF(temp) {
        return Math.round((temp - 32) * 0.5556);
    }

    handleNotOK(msg, status) {
        if (status === "ZERO_RESULTS") return "Your location returned no results.";
        else if (status === "REQUEST_DENIED") return "Geocode API Request was denied.";
        else if (status === "INVALID_REQUEST") return "Invalid Request,";
        else if (status === "OVER_QUERY_LIMIT") return "Query Limit Exceeded. Try again tomorrow.";
        else return "Unknown.";
    }

    getBase(icon) {
        if (icon === "clear-day" || icon === "partly-cloudy-day") {
            return ":white_sun_small_cloud:";
        } else if (icon === "clear-night" || icon === "partly-cloudy-night") {
            return ":white_sun_cloud:";
        } else if (icon === "rain") {
            return ":cloud_rain:";
        } else if (icon === "thunderstorm") {
            return ":thunder_cloud_rain:";
        } else if (icon === "snow" || icon === "sleet" || icon === "fog") {
            return ":cloud_snow:";
        } else if (icon === "wind" || icon === "tornado") {
            return ":cloud_tornado:";
        } else if (icon === "cloudy") {
            return ":cloud:";
        } else {
            return ":cloud:";
        }
    }

};
