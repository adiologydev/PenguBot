const { util: { mergeDefault }, KlasaConsole, constants: { DEFAULTS: { CONSOLE } } } = require("klasa");

const colorBase = {
    shard: { background: "cyan", text: "black" },
    message: {},
    time: {}
};

const PENGU_CONSOLE = {
    stdout: process.stdout,
    stderr: process.stderr,
    timestamps: true,
    utc: true,
    types: {
        ...CONSOLE.types,
        connectionopen: "log",
        connectionclose: "warn"
    },
    colors: {
        ...CONSOLE.colors,
        connectionopen: mergeDefault(colorBase, { message: { text: "lightcyan" }, time: { background: "magenta" } }),
        connectionclose: mergeDefault(colorBase, { message: { text: "lightyellow" }, time: { background: "magenta" } })
    }
};

class PenguConsole extends KlasaConsole {

    constructor(client) {
        super(client, PENGU_CONSOLE);
    }

    connectionOpen(...data) {
        this.write(data, "connectionOpen");
    }

    connectionClose(...data) {
        this.write(data, "connectionClose");
    }

}

module.exports = PenguConsole;
