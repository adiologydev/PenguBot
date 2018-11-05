const { Route } = require("klasa-dashboard-hooks");
const crypto = require("crypto");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "patreonhook" });
    }

    /* Test File - Patreon Hooks Incoming? :O */

    async post(request, response) {
        const hash = crypto.createHmac("md5", this.client.config.keys.patreon).update(JSON.stringify(request.body, "\u00a0", 0)).digest("hex");
        if (request.headers["x-patreon-signature"] !== hash) return;

        const { body, headers } = request;
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

        if (headers["x-patreon-event"] === "members:pledge:create") {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await user.settings.update([["patreon.paying", true], ["patreon.tokens", user.settings.patreon.tokens + body.data.attributes.pledge_amount_cents], ["patreon.pledged", user.settings.patreon.pledged + body.data.attributes.pledge_amount_cents], ["patreon.current", body.data.attributes.pledge_amount_cents]])
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
        } else if (headers["x-patreon-event"] === "members:pledge:delete") {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await user.settings.update([["patreon.paying", false], ["patreon.current", 0]])
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
        } else if (headers["x-patreon-event"] === "members:pledge:update") {
            const me = await this.client.users.fetch("136549806079344640").catch(() => null);
            await user.settings.update([["patreon.paying", true], ["patreon.tokens", user.settings.patreon.tokens + body.data.attributes.pledge_amount_cents], ["patreon.pledged", user.settings.patreon.pledged + body.data.attributes.pledge_amount_cents], ["patreon.current", body.data.attributes.pledge_amount_cents]])
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***User Update Error:*** \`${patron.attributes.email}\` | User: \`${user.id}\`\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            await this.client.settings.update("patrons.users", user, { action: "add" })
                .catch(async e => {
                    await me.send(`<:patreon:502495572721270791> ***Client Update Error:*** \`${patron.attributes.email}\` | User: \`${user.id}\`\n\n**Error:**\n${e}`);
                    return response.end(421);
                });
            return me.send(`<:patreon:502495572721270791> ***Updated Pledge: \`${patron.attributes.email}\` | User: \`${user.id}\`***`);
        }

        return response.end();
    }

};
