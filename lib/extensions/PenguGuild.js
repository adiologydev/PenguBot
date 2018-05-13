const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", Guild => {
    class PenguGuild extends Guild {

        music() {
            return this.client.music.get(this.id) || this.client.music.add(this);
        }

    }
    return PenguGuild;
});
