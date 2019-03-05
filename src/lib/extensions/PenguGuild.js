const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", Guild => {
    class PenguGuild extends Guild {

        get music() {
            return this.client.music.add(this);
        }

    }
    return PenguGuild;
});
