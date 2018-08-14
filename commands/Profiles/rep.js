const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["reps", "giverep", "givereputation", "reputation"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_REP_DESCRIPTION"),
            usage: "[user:user]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user]) {
        if (user) {
            if (user.id === msg.author.id) {
                return msg.sendMessage("🏆 | ***You can not give yourself a reputation point!***");
            }
            if (user.bot) {
                return msg.sendMessage("🏆 | ***You can not rep a bot, I know you love bots like me but no!***");
            }
        }
        if (msg.author.settings.repcooldown > 0) {
            await msg.author.settings.waitSync();
            const now = Date.now();
            const last = msg.author.settings.repcooldown;
            const diff = now - last;
            const next = 43200000 - diff;

            const hours = Math.floor(next / 3600000);
            const minutes = Math.floor((next / 60000) - (hours * 60));
            const seconds = (next / 1000) - ((hours * 3600) + (minutes * 60));
            const timeLeft = `${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;

            if (diff >= 43200000) {
                if (!user) {
                    return msg.sendMessage("🏆 | ***You can now give a reputation point!***");
                } else {
                    await msg.author.settings.update("repcooldown", Date.now());
                    await user.settings.update("reps", user.settings.reps + 1);
                    return msg.sendMessage(`🏆 | ***You have given a reputation point to ${user}!***`);
                }
            } else {
                return msg.sendMessage(`🏆 | ***You can give another reputation point in ${timeLeft}!***`);
            }
        } else if (!user) {
            return msg.sendMessage("🏆 | ***You can now give a reputation point!***");
        } else {
            msg.author.settings.update("repcooldown", Date.now());
            await user.settings.update("reps", user.settings.reps + 1);
            return msg.sendMessage(`🏆 | ***You have given a reputation point to ${user}!***`);
        }
    }

    async init() {
        if (!this.client.gateways.users.schema.has("reps")) {
            this.client.gateways.users.schema.add("reps", { type: "integer", default: 0, configurable: false });
        }
        if (!this.client.gateways.users.schema.has("repcooldown")) {
            this.client.gateways.users.schema.add("repcooldown", { type: "integer", default: 0, configurable: false });
        }
    }

};
