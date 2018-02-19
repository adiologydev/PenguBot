const { Command } = require("discord.js-commando");
const { inspect } = require("util");
const discord = require("discord.js"); //eslint-disable-line
const { post } = require("snekfetch");

module.exports = class EvalCommand extends Command {

    constructor(client) {
        super(client, {
            name: "ev",
            group: "core",
            memberName: "eval",
            description: "none :D",
            args: [{
                key: "code",
                prompt: "What would u like to eval?\n",
                type: "string"
            }]
        });
        this.depth = 0;
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    async run(msg, { code }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const client = msg.client; // eslint-disable-line
        const guild = msg.guild; // eslint-disable-line 
        try {
            const evaled = eval(code);
            let ogeval = evaled;
            if (evaled instanceof Promise) ogeval = await ogeval;
            if (typeof evaled !== "string") ogeval = inspect(ogeval, { depth: this.depth, showHidden: true });
            ogeval = ogeval.replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(this.client.token, "g"), "No u");

            if (ogeval.length > 1950) {
                const haste = await this.client.Util.haste(ogeval, "js");
                msg.say(`**Typeof:** \`${this.getComplexType(evaled).type}\`
\`Input:\`
${this.codeBlock("js", code)}
\`Output:\` **Evaled code was over 2000 letters Here yo go **${haste}`);
            } else {
                msg.say(`**Typeof:** \`${this.getComplexType(evaled).type}\`
\`Input:\`
${this.codeBlock("js", code)}
\`Output:\`
${this.codeBlock("js", ogeval)}
`);
            }
        } catch (err) {
            msg.say(`
\`Input:\`
${this.codeBlock("js", code)}
\`Error:\`
${this.codeBlock("js", err)}`);
        }
    }

    codeBlock(lang, expression) {
        return `\`\`\`${lang}\n${expression || "\u200b"}\`\`\``;
    }

    haste(input, extension) {
        return new Promise((res, rej) => {
            if (!input) rej("Input argument is required.");
            post("https://hastebin.com/documents").send(input).then(body => {
                res(`https://hastebin.com/${body.body.key}${extension ? `.${extension}` : ""}`);
            }).catch(e => rej(e));
        });
    }

    getType(value) {
        if (value === null) return String(value);
        return typeof value;
    }

    getComplexType(value) {
        const basicType = this.getType(value);
        if (basicType === "object" || basicType === "function") return { basicType, type: this.getClass(value) };
        return { basicType, type: basicType };
    }

    getClass(value) {
        return value && value.constructor && value.constructor.name ?
            value.constructor.name :
            {}.toString.call(value).match(/\[object (\w+)\]/)[1];
    }

};
