const LavaManager = require("./LavaManager.js");
const { Collection } = require("discord.js");

class MusicManager extends LavaManager {

    constructor(client) {
        super(client);
        this.queue = new Collection();
    }

    player(data, type = []) {
        return this.caseHandler(type, data);
    }

    async caseHandler(type, data = {}) {
        const typed = type[0];
        if (typed === "get") {
            return this.manager.get(data.guild.id);
        } else if (typed === "leave") {
            return this.manager.leave(data.guild.id);
        } else if (typed === "delete") {
            return this.manager.delete(data.guild.id);
        } else if (typed === "volume") {
            return this.manager.get(data.guild.id).volume(data.volume);
        } else if (typed === "queue") {
            if (type[1] === "set") {
                return this.queue.set(data.guild.id, data.queueConst);
            } else if (type[1] === "get") {
                return this.queue.get(data.guild.id);
            }
        }
    }

}

module.exports = MusicManager;
