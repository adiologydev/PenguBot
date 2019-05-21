const { Route } = require("../index");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "pieces/:type/:name" });
    }

    get(request, response) {
        const { type, name } = request.params;
        const store = this.client.pieceStores.get(type);
        if (!store) response.status(200).json("[]");
        if (name === "all") return response.status(200).json(store.array());
        const piece = store.get(name);
        if (!piece) return response.status(200).json("{}");
        return response.status(200).json(piece);
    }

};
