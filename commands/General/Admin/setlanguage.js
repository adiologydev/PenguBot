const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            aliases: ["language", "selectlanguage"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SETLANGUAGE_DESCRPTION"),
            usage: "<language:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [language]) {
        const currLang = msg.guild.settings.language;
        if (/english|inglese|en|en-us/i.test(language)) {
            if (currLang === "en-US") throw `${this.client.emotes.cross} ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "en-US");
        } else if (/italian|italiano|it|it-it/i.test(language)) {
            if (currLang === "it-IT") throw `${this.client.emotes.cross} ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "it-IT");
        } else {
            throw `${this.client.emotes.cross} ***${msg.language.get("ER_NO_LANG")}***`;
        }
    }

    async changeLanguage(msg, language) {
        await msg.guild.settings.update("language", language);
        return msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("CONF_LANG_SET")}***`);
    }

};
