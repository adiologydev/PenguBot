const { Function } = require("@kcp/functions");

module.exports = class extends Function {

    run(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

};
