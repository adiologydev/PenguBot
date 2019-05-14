const { Task, config } = require("../index");
const { post } = require("snekfetch");

const CREDENTIALS = `${Buffer.from(`${config.keys.music.spotify.id}:${config.keys.music.spotify.secret}`).toString("base64")}`;

module.exports = class extends Task {

    async run() {
        const res = await post(`https://accounts.spotify.com/api/token`, {
            data: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: `Basic ${CREDENTIALS}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (res.status !== 200) return;
        this.client.config.keys.music.spotify.token = res.body.access_token;
    }

    async init() {
        await this.run();
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("spotify", "*/30 * * * *");
        }
    }

};
