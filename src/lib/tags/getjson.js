const { Builder } = require("breadtags");
const { get } = require("snekfetch");

module.exports = new Builder()
    .setDescription("Get JSON content from a websource.")
    .setType("getjson")
    .hasAction()
    .requiredArgs(1)
    .setProcess(async ctx => {
        const [str, propPath] = ctx.value;
        const { body } = await get(str);
        if (!body || body instanceof Buffer) throw "Malformed JSON.";
        if (!propPath) return JSON.stringify(body);
        return getProp(body, propPath);
    });

function getProp(body, prop) {
    if (prop === undefined) return body;
    const propParts = `${prop}`.split(".");
    let result = body, lastProp;
    while ((lastProp = propParts.shift()) !== undefined) {
        if (result[lastProp] === undefined) return undefined;
        result = result[lastProp];
    }
    return result;
}
