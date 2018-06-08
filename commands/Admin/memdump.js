const { Command } = require("klasa");
const { join } = require("path");
const writeSnapshot = require("util")
    .promisify(require("heapdump").writeSnapshot);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            permissionLevel: 10,
            guarded: true,
            description: "Creates a heapdump for finding memory leaks.",
            extendedHelp: [
                "The heapsnapshot command is very useful for bots that have memory issues, it uses the heapdump library",
                "which freezes the entire process for a moment to analize all elements from the process' HEAP, NEVER share",
                "heapsnapshot files with anybody, as everything your bot holds is included in that file.\n\nTo open heapsnapshot",
                'files, open Google Chrome, open Developer Tools, go to the tab Memory, and in Profiles, click on the buttom "load".',
                "Finally, open the profile and you will be given a table of all objects in your process, have fun!\n\nP.S:",
                "heapsnapshot files are as big as the amount of RAM you use, in big bots, the snapshots can freeze the bot",
                "much longer and the files can be much heavier."
            ].join(" ")
        });
    }

    async run(msg) {
        await msg.sendMessage("Capturing HEAP Snapshot. This may take a while...");

        // Capture the snapshot (this freezes the entire VM)
        const path = join(process.cwd(), `${Date.now()}.heapsnapshot`);
        await writeSnapshot(path);

        return msg.sendMessage(`Captured in \`${path}\`, check! Remember, do NOT share this with anybody, it may contain a lot of sensitive data.`);
    }

};
