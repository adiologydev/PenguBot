const { Structures } = require("discord.js");
const PenguMemberManager = require("./PenguMemberManager");

Structures.extend("Guild", Guild => {
    class KlasaGuild extends Guild {

        constructor(client, data) {
            // avoid double iteration by the super class populating the members collection
            const { members, ...restData } = data || {};
            super(client, Object.keys(restData).length ? restData : undefined);

            this.members = new PenguMemberManager(this);
            if (members) for (const member of members) this.members.add(member);
        }

    }

    return KlasaGuild;
});
