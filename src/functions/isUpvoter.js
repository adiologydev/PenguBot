const { Function } = require("klasa-functions");

module.exports = class extends Function {

    run(user) {
        const diff = Date.now() - user.settings.lastUpvote;
        if (diff <= 43200000) return true;
        return false;
    }

};
