const { Task, config } = require("../index");

const CREDENTIALS = Buffer.from(`${config.apis.spotify.id}:${config.apis.spotify.secret}`).toString("base64");

module.exports = class extends Task {

    async run() {
        const res = await this.fetchURL(`https://accounts.spotify.com/api/token`, {
            body: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: `Basic ${CREDENTIALS}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (res.status !== 200) return;
        config.apis.spotify.token = res.access_token;
    }

    init() {
        return this.run();
    }

};
