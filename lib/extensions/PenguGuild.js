const { Structures } = require("discord.js");
const MusicInterface = require("../structures/MusicInterface");

module.exports = Structures.extend("Guild", Guild => {
    class PenguGuild extends Guild {

        constructor(...args) {
            super(...args);

            this.music = new MusicInterface(this);
        }

    }
    return PenguGuild;
});
