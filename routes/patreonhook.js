const { Route } = require("klasa-dashboard-hooks");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "patreonhook" });
    }

    /* Test File - Patreon Hooks Incoming? :O */

    async post(request, response) {
        const { body } = request;
        const patron = body.included.find(d => d.type === "user");
        if (!patron.attributes.social_connections.discord) {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await me.send(`<:patreon:502495572721270791> ***No Discord ID Linked with Account:*** ${patron.attributes.email}`);
            return response.end(421);
        }

        const user = await this.client.users.fetch(patron.attributes.social_connections.discord.user_id).catch(() => null);
        if (!user) {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await me.send(`<:patreon:502495572721270791> ***Discord User Not Found:*** ${patron.attributes.email}`);
            return response.end(421);
        }

        if (body.data.relationships.currently_entitled_rewards.data.length > 0) {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await user.settings.update([["patreon.paying", true], ["patreon.tokens", user.settings.patreon.tokens + body.data.attributes.pledge_amount_cents], ["patreon.pledged", user.settings.patreon.pledged + body.data.attributes.pledge_amount_cents]])
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***User Update Error:*** \`${patron.attributes.email}\` | User: \`${user.id}\`\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            await this.client.settings.update("patrons.users", user, { action: "add" })
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***Client Update Error:*** \`${patron.attributes.email}\` | User: \`${user.id}\`\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            return me.send(`<:patreon:502495572721270791> ***Created Pledge: \`${patron.attributes.email}\` | User: \`${user.id}\`***`);
        } else {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await user.settings.update("patreon.paying", false)
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***User Update Error:*** ${patron.attributes.email}\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            await this.client.settings.update("patrons.users", user, { action: "remove" })
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***Client Update Error:*** \`${patron.attributes.email}\` | User: \`${user.id}\`\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            me.send(`<:patreon:502495572721270791> ***Cancelled Pledge: \`${patron.attributes.email}\` | User: \`${user.id}\`***`);
        }

        return response.end();
    }

};
