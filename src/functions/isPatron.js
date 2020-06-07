const { Function } = require("@kcp/functions");

module.exports = class extends Function {

    run(guild) {
        return guild.client.settings.get("pGuilds").includes(guild.id);
    }

};
