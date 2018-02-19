module.exports = (client, msg, reason) => {
    console.log("[COMMAND BLOCKED!]", `
Guild: ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : "DM"}
User Tag: ${msg.author.tag}
Command: ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
Reason: ${reason ? `${reason}` : ""}`);
};
