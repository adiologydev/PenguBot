const cluster = require("cluster");
const path = require("path");
const { Shard } = require("discord.js");

Shard.prototype.spawn = async function spawn(waitForReady = true) {
    if (this.process) throw new Error("SHARDING_PROCESS_EXISTS", this.id);

    cluster.setupMaster({
        exec: path.resolve(this.manager.file),
        args: this.args || [],
        env: this.env,
        execArgv: this.execArgv || []
    });

    this.process = cluster.fork(this.env)
        .on("message", this._handleMessage.bind(this))
        .on("exit", this._exitListener);

    /**
     * Emitted upon the creation of the shard's child process.
     * @event Shard#spawn
     * @param {ChildProcess} process Child process that was created
     */
    this.emit("spawn", this.process);

    if (!waitForReady) return this.process;
    await new Promise((resolve, reject) => {
        this.once("ready", resolve);
        this.once("disconnect", () => reject(new Error("SHARDING_READY_DISCONNECTED", this.id)));
        this.once("death", () => reject(new Error("SHARDING_READY_DIED", this.id)));
        setTimeout(() => reject(new Error("SHARDING_READY_TIMEOUT", this.id)), 30000);
    });
    return this.process;
};
