const { Function } = require("klasa-functions");

module.exports = class extends Function {

    run(guild) {
        return guild.client.settings.pGuilds.includes(guild.id);
    }

};
