const { Route, config } = require("../index");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, {
            route: "votes/dbl"
        });
    }

    async post(req, res) {
        if (req.headers.authorization !== config.apis.dbl) {
            res.statusCode = 401;
            return res.end(JSON.stringify({ message: "Unauthenticated" }));
        }

        const data = req.body;

        const user = await this.client.users.fetch(data.user).catch(() => null);
        if (!user) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "User not found" }));
        }

        await user.settings.sync(true);
        let amount = this.client.funcs.randomNumber(100, 200);

        if (data.isWeekend) amount *= 2;
        if (user && user.send) user.send(`<:penguSuccess:435712876506775553> ***Thank you for Upvoting PenguBot on DiscordBots.org, you've recieved ❄ \`${amount}\` Snowflakes as a bonus! You can do this again after 12 hours at <https://top.gg/bot/PenguBot/vote>. You can use these Snowflakes to play games, give them to other people, buy profile backgrounds or save up for upcoming features!***\n\n**Tip: **\`Voting on Weekends will give you double reward than usual so don't forget to upvote then as well!\``).catch(() => null);
        await user.settings.update([["snowflakes", user.settings.get("snowflakes") + amount], ["lastUpvote", Date.now()]]);

        res.statusCode = 200;
        return res.end(JSON.stringify({ message: "Successful" }));
    }

};
