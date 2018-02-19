module.exports = (client, command) => {
    const cmds = client.cmdRun;
    cmds[command.name] += 1;
};
