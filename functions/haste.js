const { Function } = require("klasa-functions");
const { post } = require("snekfetch");

module.exports = class extends Function {

    async run(input, extension = "js") {
        return post("https://hastebin.com/documents")
        .send(input)
        .then(res => `https://hastebin.com/${res.body.key}.${extension}`);
    }

};
