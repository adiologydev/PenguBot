const { util: { fetch } } = require("../../index");

module.exports = {
    name: "getjson",
    run: async ctx => {
        const [str, propPath] = ctx.value;
        const body = await fetch(str);
        if (!body) throw "No JSON found.";
        if (!propPath) return JSON.stringify(body);
        return getProp(body, propPath);
    }
};

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
