const { util: { mergeDefault } } = require("klasa");

const colorBase = {
    shard: { background: "cyan", text: "black" },
    message: {},
    time: {}
};

module.exports = {
    stdout: process.stdout,
    stderr: process.stderr,
    timestamps: true,
    utc: true,
    types: {
        debug: "log",
        error: "error",
        log: "log",
        verbose: "log",
        warn: "warn",
        wtf: "error",
        connectionopen: "log",
        connectionclose: "warn"
    },
    colors: {
        debug: mergeDefault(colorBase, { time: { background: "magenta" } }),
        error: mergeDefault(colorBase, { time: { background: "red" } }),
        log: mergeDefault(colorBase, { time: { background: "blue" } }),
        verbose: mergeDefault(colorBase, { time: { text: "gray" } }),
        warn: mergeDefault(colorBase, { time: { background: "lightyellow", text: "black" } }),
        wtf: mergeDefault(colorBase, { message: { text: "red" }, time: { background: "red" } }),
        connectionopen: mergeDefault(colorBase, { message: { text: "lightcyan" }, time: { background: "magenta" } }),
        connectionclose: mergeDefault(colorBase, { message: { text: "lightyellow" }, time: { background: "magenta" } })
    }
};
