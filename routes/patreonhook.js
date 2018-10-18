const { Route } = require("klasa-dashboard-hooks");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "patreonhook" });
    }

    /* Test File - Patreon Hooks Incoming? :O */

    async post(request, response) {
        const body = request.read();

        console.log(body);

        response.statusCode(200);
        return response.end();
    }

};
