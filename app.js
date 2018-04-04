const client = require("./structures/PenguClient");

client.login(client.config.main.token);

process.on("unhandledRejection", error => console.log(`unhandledRejection:\n${error.stack}`))
    .on("uncaughtException", error => console.log(`uncaughtException:\n${error.stack}`))
    .on("error", error => console.log(`Error:\n${error.stack}`))
    .on("warn", error => console.log(`Warning:\n${error.stack}`));
