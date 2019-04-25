// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Provider, util: { mergeDefault, chunk } } = require("klasa");
const { r } = require("rethinkdb-ts"); // eslint-disable-line id-length

module.exports = class extends Provider {

    constructor(...args) {
        super(...args);

        this.db = r;
        this.connection = null;
    }

    async init() {
        const options = mergeDefault({
            db: "pengubot",
            silent: false
        }, this.client.options.providers.rethinkdb);

        this.connection = await r.connect(options);
        await this.db.branch(this.db.dbList().contains(options.db), null, this.db.dbCreate(options.db)).run(this.connection);
    }

    async ping() {
        const now = Date.now();
        return (await this.db.now().run(this.connection)).getTime() - now;
    }

    shutdown() {
        return this.connection.close();
    }

    /* Table methods */

    hasTable(table) {
        return this.db.tableList().contains(table).run(this.connection);
    }

    createTable(table) {
        return this.db.tableCreate(table).run(this.connection);
    }

    deleteTable(table) {
        return this.db.tableDrop(table).run(this.connection);
    }

    sync(table) {
        return this.db.table(table).sync().run(this.connection);
    }

    /* Document methods */

    async getAll(table, entries = []) {
        if (entries.length) {
            const chunks = chunk(entries, 50000);
            const output = [];
            for (const myChunk of chunks) output.push(...await this.db.table(table).getAll(...myChunk).run(this.connection));
            return output;
        }
        return this.db.table(table).run(this.connection);
    }

    async getKeys(table, entries = []) {
        if (entries.length) {
            const chunks = chunk(entries, 50000);
            const output = [];
            for (const myChunk of chunks) output.push(...await this.db.table(table).getAll(...myChunk)("id").run(this.connection));
            return output;
        }
        return this.db.table(table)("id").run(this.connection);
    }

    get(table, id) {
        return this.db.table(table).get(id).run(this.connection);
    }

    has(table, id) {
        return this.db.table(table).get(id).ne(null).run(this.connection);
    }

    getRandom(table) {
        return this.db.table(table).sample(1).run(this.connection);
    }

    create(table, id, value = {}) {
        return this.db.table(table).insert({ ...this.parseUpdateInput(value), id }).run(this.connection);
    }

    update(table, id, value) {
        return this.db.table(table).get(id).update(this.parseUpdateInput(value)).run(this.connection);
    }

    replace(table, id, value) {
        return this.db.table(table).get(id).replace({ ...this.parseUpdateInput(value), id }).run(this.connection);
    }

    delete(table, id) {
        return this.db.table(table).get(id).delete().run(this.connection);
    }

};
