class ProfilesProvider {

    constructor(client) {
        this.client = client;
    }

    async set(id, key, value) {
        if (!id) throw `No id provided`;
        if (!key) throw `No key provided`;
        if (!value) throw `No value provided`;
        const exist = this.client.db.query(`SELECT id FROM profiles where id='${id}'`).then(r => r[0][0]);
        if (!exist) return this.client.db.query(`INSERT INTO profiles values(id = '${id}')`);

        if (key === "xp") return await this._set(id, "xp", value);
        if (key === "snowflakes") return await this._set(id, "snowflakes", value);
        if (key === "title") return await this._set(id, "title", value);
        if (key === "reps") return await this._set(id, "reps", value);
        if (key === "daily") return await this._set(id, "daily", value);
    }

    async get(id, key) {
        const exist = this.client.db.query(`SELECT id FROM profiles where id='${id}'`).then(r => r[0][0]);
        if (!exist) return;
        if (!id) throw `No id provided`;
        if (!key) throw `No key provided`;

        if (key === "xp") return await this._get(id, "xp");
        if (key === "snowflakes") return await this._get(id, "snowflakes");
        if (key === "title") return await this._get(id, "title");
        if (key === "reps") return await this._get(id, "reps");
        if (key === "daily") return await this._get(id, "daily");
    }

    async clear(id, key) {
        const exist = this.client.db.query(`SELECT id FROM profiles where id='${id}'`).then(r => r[0][0]);
        if (!exist) return;

        if (key === "xp") {
            await this.client.db.query(`UPDATE profiles SET xp=NULL WHERE id="${id}"`);
        }

        if (key === "snowflakes") {
            await this.client.db.query(`UPDATE profiles SET snowflakes=NULL WHERE id="${id}"`);
        }

        if (key === "title") {
            await this.client.db.query(`UPDATE profiles SET title=NULL WHERE id="${id}"`);
        }

        if (key === "reps") {
            await this.client.db.query(`UPDATE profiles SET reps=NULL WHERE id="${id}"`);
        }

        if (key === "daily") {
            await this.client.db.query(`UPDATE profiles SET daily=NULL WHERE id="${id}"`);
        }
    }

    async _set(id, key, value) {
        await this.client.db.query(`UPDATE profiles SET ${key} = ${value} WHERE id="${id}"`);
        return value;
    }

    async _get(id, key) {
        return await this.client.db.query(`SELECT ${key} FROM profiles WHERE id="${id}"`).then(r => r[0][0][key]);
    }

}

module.exports = ProfilesProvider;
