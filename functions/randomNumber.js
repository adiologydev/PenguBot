const { Function } = require("klasa-functions");

module.exports = class extends Function {

    run(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

};
