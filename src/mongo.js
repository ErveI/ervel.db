const Base = require("./base.js");
const Schema = require("./schema.js");
const fs = require("fs");
const Util = require("./util.js");

class MongoProvider extends Base {

constructor(mongodbURL, name, connectionOptions={}) {
super(mongodbURL || process.env.MONGODB_URL, connectionOptions);
this.schema = Schema(this.connection, name);
}

async set(key, value) {
if(!Util.isKey(key)) throw Error("Invalid key specified.", "KeyError");
if(!Util.isValue(value)) throw Error("Invalid value specified.", "ValueError");

const parsed = Util.parseKey(key);
let raw = await this.schema.findOne({ ID: parsed.key });
if(!raw) {
let data = new this.schema({ ID: parsed.key, data: parsed.target ? Util.setData(key, {}, value) : value });
await data.save().catch(e => { return this.emit("error", e) });
return data.data;
} else {
raw.data = parsed.target ? Util.setData(key, Object.assign({}, raw.data), value) : value;
await raw.save().catch(e => { return this.emit("error", e) });
return raw.data;
}
}

async delete(key) {
if(!Util.isKey(key)) throw Error("Invalid key specified.", "KeyError");
const parsed = Util.parseKey(key);
const raw = await this.schema.findOne({ ID: parsed.key });
if(!raw) return false;
if(parsed.target) {
let data = Util.unsetData(key, Object.assign({}, raw.data));
if (data === raw.data) return false;
raw.data = data;
raw.save().catch(e => this.emit("error", e));
return true;
} else {
await this.schema.findOneAndDelete({ ID: parsed.key }).catch(e => {
return this.emit("error", e);
});
return true;
}
}

async exists(key) {
if(!Util.isKey(key)) throw Error("Invalid key specified.", "KeyError");
const parsed = Util.parseKey(key);

let get = await this.schema.findOne({ ID: parsed.key }).catch(e => { return this.emit("error", e) });
if (!get) return null;
let item;
if (parsed.target) item = Util.getData(key, Object.assign({}, get.data));
else item = get.data;
return item === undefined ? false : true;
}

async has(key) {

return await this.exists(key);

}

async get(key) {

if (!Util.isKey(key)) throw Error("Invalid key specified.", "KeyError");

const parsed = Util.parseKey(key);



let get = await this.schema.findOne({ ID: parsed.key }).catch(e => {
return this.emit("error", e);
});

if (!get) return null;

let item;
if (parsed.target) item = Util.getData(key, Object.assign({}, get.data));
else item = get.data;
return item !== undefined ? item : null;

}


async fetch(key) {

return this.get(key);

}



async all(limit = 0) {

if (typeof limit !== "number" || limit < 1) limit = 0;
let data = await this.schema.find().catch(e => {});
if (!!limit) data = data.slice(0, limit);

return data.map(m => ({ ID: m.ID, data: m.data }));

}




async fetchAll(limit) {
return await this.all(limit);

}



async deleteAll() {
this.emit("debug", "Deleting everything from the database...");
await this.schema.deleteMany().catch(e => {});
return true;

}


add(key, value) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
if (!value) throw Error("Invalid value specified.", "ValueError");
if(isNaN(value)) throw Error("Value must be number.", "ValueError");
return this.set(key, +value);
}


get uptime() {

if (!this.readyAt) return 0;

const timestamp = this.readyAt.getTime();

return Date.now() - timestamp;

}





export(fileName="database", path="./") {

return new Promise((resolve, reject) => {

this.emit("debug", `Exporting database entries to ${path || ""}${fileName}`);

this.all().then((data) => {

const strData = JSON.stringify(data);

if (fileName) {

fs.writeFileSync(`${path || ""}${fileName}`, strData);

this.emit("debug", `Exported all data!`);

return resolve(`${path || ""}${fileName}`);

}

return resolve(strData);

}).catch(reject);

});

}





import(data=[], ops = { unique: false, validate: false }) {

return new Promise(async (resolve, reject) => {

if (!Array.isArray(data)) return reject(Error(`Data type must be Array, ${typeof data}.`, "DataTypeError"));

if (data.length < 1) return resolve(false);

if (!ops.unique) {

this.schema.insertMany(data, { ordered: !ops.validate }, (error) => {

if (error) return reject(Error(`${error}`, "DataImportError"));

return resolve(true);

});

} else {

data.forEach((x, i) => {

if (!ops.validate && (!x.ID || !x.data)) return;

else if (!!ops.validate && (!x.ID || !x.data)) return reject(Error(`Data is missing ${!x.ID ? "ID" : "data"} path.`, "DataImportError"));

setTimeout(() => {

this.set(x.ID, x.data);

}, 150 * (i + 1));

});

return resolve(true);

}

});

}

disconnect() {

this.emit("debug", "Destroying in process...");

return this.destroyDatabase();

}



connect(url) {

return this.create(url);

}



get name() {

return this.schema.modelName;

}




async read() {

let start = Date.now();

await this.get("LQ==");

return Date.now() - start;

}





async write() {

let start = Date.now();

await this.set("LQ==", Buffer.from(start.toString()).toString("base64"));

return Date.now() - start;

}



async fetchLatency() {

let read = await this.read();

let write = await this.write();

let average = (read + write) / 2;

this.delete("LQ==").catch(e => {});

return { read, write, average };

}

async ping() {

return await this.fetchLatency();

}

async type(key) {

if (!Util.isKey(key)) throw Error("Invalid Key.", "KeyError");

let fetched = await this.get(key);

if (Array.isArray(fetched)) return "array";

return typeof fetched;

}

async keyArray() {

const data = await this.all();

return data.map(m => m.ID);

}



async valueArray() {

const data = await this.all();

return data.map(m => m.data);

}




async push(key, value) {

const data = await this.get(key);

if (data == null) {

if (!Array.isArray(value)) return await this.set(key, [value]);

return await this.set(key, value);

}

if (!Array.isArray(data)) throw Error(`Expected target type to be Array, ${typeof data}.`);

if (Array.isArray(value)) return await this.set(key, data.concat(value));

data.push(value);

return await this.set(key, data);

}



async pull(key, value, multiple = true) {

let data = await this.get(key);

if (data === null) return false;

if (!Array.isArray(data)) throw Error(`Expected target type to be Array, ${typeof data}.`);

if (Array.isArray(value)) {

data = data.filter(i => !value.includes(i));

return await this.set(key, data);

} else {

if (!!multiple) {

data = data.filter(i => i !== value);

return await this.set(key, data);

} else {

const hasItem = data.some(x => x === value);

if (!hasItem) return false;

const index = data.findIndex(x => x === value);

data = data.splice(index, 1);

return await this.set(key, data);

}
}
}

async entries() {
return await this.schema.estimatedDocumentCount();
}



async raw(params) {
return await this.schema.find(params); 
}


createModel(name) {
if (!name || typeof name !== "string") throw Error("Invalid model name.");
const CustomModel = new MongoProvider(this.dbURL, name, this.options);
return CustomModel;

}

get utils() {
return Util;
}

updateModel(name) {
this.schema = Schema(name);
return this.schema;
}


version(){
return require('../package.json').version;
}
}



module.exports = MongoProvider;