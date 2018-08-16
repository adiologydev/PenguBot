const { Event } = require("klasa");

module.exports = class extends Event {

    async run(guild) {
        // Patreon Checker
        if (this.client.config.main.patreon === true && this.client.user.id === "438049470094114816") {
            if (!this.client.settings.pGuilds.includes(guild.id)) {
                const owner = guild.owner ? guild.owner : await guild.members.fetch(guild.ownerID).catch(() => null);
                if (owner) await guild.owner.send("<:penguError:435712890884849664> ***You may not add the Patreon Only bot to your guild, to become a Patreon visit: https://www.patreon.com/PenguBot. If you think this is a mistake and you already have Patreon, join our support guild and contact a staff member to gain your access: https://discord.gg/u8WYw5r***"); // eslint-disable-line
                await guild.leave();
            }
        }
    }

};
