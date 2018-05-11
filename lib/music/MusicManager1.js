const LavaManager = require("./LavaManager.js");
const { Collection } = require("discord.js");

class MusicManager extends LavaManager {

    constructor(client) {
        super(client);
        this.queue = new Collection();
        this.allowedTypes = [
            [
                "get",
                "leave",
                "join",
                "delete",
                "volume",
                "queue"
            ],
            [
                "set",
                "get",
                "delete"
            ]
        ];
        this.defaultRegions = {
            asia: ["sydney", "singapore", "japan", "hongkong"],
            eu: ["london", "frankfurt", "amsterdam", "russia", "eu-central", "eu-west"],
            us: ["us-central", "us-west", "us-east", "us-south", "brazil"]
        };
    }

    player(data, type = []) {
        if (!type[0] && !this.allowedTypes[0].includes(type)) throw new TypeError("Type used for the player is incorrect");
        if ((type[0] === "queue") && !type[1] && !this.allowedTypes[1].includes(type[1])) throw new TypeError("Incorrect subtype for queue");
        return this.caseHandler(type, data);
    }

    async caseHandler(type, data = {}) {
        const typed = type[0];
        if (typed === "get") {
            return this.manager.get(data.id);
        } else if (typed === "leave") {
            return this.manager.leave(data.id);
        } else if (typed === "join") {
            return this.manager.join({
                guild: data.guildID,
                channel: data.voiceChannelID,
                host: this.getIdealHost(data.region)
            }, { selfdeaf: data.selfDeaf });
        } else if (typed === "delete") {
            return this.manager.delete(data.id);
        } else if (typed === "volume") {
            return this.manager.get(data.id).volume(data.volume);
        } else if (typed === "queue") {
            if (type[1] === "set") {
                return this.queue.set(data.id, data.queueConst);
            } else if (type[1] === "get") {
                return this.queue.get(data.id);
            } else if (type[1] === "delete") {
                return this.queue.delete(data.id);
            }
        }
    }

}

module.exports = MusicManager;
