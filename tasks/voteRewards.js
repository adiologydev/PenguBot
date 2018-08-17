const { Task } = require("klasa");

module.exports = class extends Task {

    async run(vote) {
        const user = await this.client.users.fetch(vote.user).then(() => null);
        if (!user) return;

        await user.settings.sync(true);
        let amount = this.client.functions.randomNumber(100, 200);
        if (vote.isWeekend) amount *= 2;
        if (user && user.send) user.send(`<:penguSuccess:435712876506775553> ***Thank you for Upvoting PenguBot, you've recieved ❄ \`${amount}\` Snowflakes as a bonus! You can do this again after 12 hours at <https://www.pengubot.com/upvote>. You can use these Snowflakes to play games, give them to other people, buy profile backgrounds or save up for upcoming features!***\n\n**Tip: **\`Voting on Weekends will give you double reward than usual so don't forget to upvote then as well!\``);
        user.settings.update("snowflakes", user.settings.snowflakes + amount);
    }

};
