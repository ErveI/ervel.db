const fs = require("graceful-fs");
const BSON = require("bson");
const EventEmitter = require("events").EventEmitter;
const { initCheckUpdates } = require('../checkupdate.js')



const read = (file) => {
try {
return BSON.deserialize(fs.readFileSync(file));
} catch (error) {
if(error.message.includes("BSONError: bson size must be >= 5, is 0")) { 
return console.error('Your database has been corrupted. Fix your database or open a new database. Error:', err);
} else {
throw error;
}
}
};

const save = (file, data) => {
return fs.writeFileSync(file, BSON.serialize(data));
};

class BsonProvider extends EventEmitter {
constructor(options) { 
super()
const { path, separator, useEmit, checkUpdate } = options;

this.path = path || 'ervel.bson';
this.separator = separator || '.';
this.useEmit = useEmit || false;
this.checkUpdate = checkUpdate || false;

if (typeof path !== 'string' && path !== undefined) throw new Error('Path must be string.')
if (typeof separator !== 'string' && separator !== undefined) throw new Error('separator must be string.')
if (typeof useEmit !== 'boolean' && useEmit !== undefined) throw new Error('UseEmit must be a boolean.')
if (typeof checkUpdate !== 'boolean' && checkUpdate !== undefined) throw new Error('checkUpdate must be a boolean.')

if (this.checkUpdate) {
initCheckUpdates();
}

if (!this.path.startsWith('./')) this.path = "./" + this.path
if (!this.path.endsWith(".bson")) this.path = this.path + ".bson"

if (!fs.existsSync(this.path)) {
if (!fs.existsSync(this.path.substring(0, this.path.lastIndexOf('/')))) {
fs.mkdirSync(this.path.substring(0, this.path.lastIndexOf('/')), { recursive: true });
}
save(this.path, {});
}
}

set(key, value) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");
let db = read(this.path)
let keyPath = key;

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
const lastKey = keySplit.pop();
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
current[currentKey] = {};
}

current = current[currentKey];
}

keyPath = lastKey;
current[lastKey] = value;
} else {
db[key] = value;
}

save(this.path, db);
if(this.useEmit) { 
this.emit('set', { key, value });
}
return value;
}

fetch(key) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path)
let result = db;

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
return null;
}

current = current[currentKey];
}

result = current;
} else {
result = db[key];
}

return result;
}


size() {
let stats = (0, fs.statSync)(`${this.path}`);
return { byte: stats.size, megabyte: stats.size / (1024 * 1024), kilobyte: stats.size / (1024) };
}

has(key) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path);

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
return false;
}

current = current[currentKey];
}
} else {
if (!db[key]) return false;
}

return true;
}

clear() {
save(this.path, {})
if(this.useEmit) { 
this.emit('clear', true);
}
return true;
}

version(){
return require('../package.json').version;
}

backup(path = null, interval = null) {

function renameFilePath(path) {
const lastSlashIndex = path.lastIndexOf('/');
const directory = path.substring(0, lastSlashIndex + 1);
const fileName = path.substring(lastSlashIndex + 1);
const newFileName = fileName.replace('.bson', '-backup');
return directory + newFileName;
}

if(path == null) path = renameFilePath(this.path)

if (typeof path !== 'string' && path !== null) throw new Error('Path must be string.')
if(path === this.path && path !== null) throw new Error('filename cannot same as orjinal database name.')
if (path.endsWith(".bson") && path !== null) throw new Error('Do not include file extensions in your file name.');

function convertToMilliseconds(input) {
const regex = /^(\d+)([a-z]+)$/i;
const match = input.match(regex);

if (!match) {
return 'Invalid entry!'
}

const value = parseInt(match[1], 10);
const unit = match[2].toLowerCase();

const units = {
s: 1000,
m: 60000,
h: 3600000
};

if (!units.hasOwnProperty(unit)) {
return 'Invalid unit!'
}

const milliseconds = value * units[unit];

return milliseconds;
}

if ((convertToMilliseconds(interval) === 'Invalid entry!' || convertToMilliseconds(interval) === 'Invalid unit!') && interval !== null) throw new Error('interval must be number. Usage Example: **12m / 12h / 12s*')

const db = BSON.deserialize(fs.readFileSync(this.path));

if (interval !== null) {
setInterval(() => {
console.log("Auto backup successfully saved.")

if (!fs.existsSync(path)) {
if (!fs.existsSync(path.substring(0, path.lastIndexOf('/')))) {
fs.mkdirSync(path.substring(0, path.lastIndexOf('/')), { recursive: true });
}

fs.writeFileSync(`${path}.bson`, BSON.serialize(db));
}
}, convertToMilliseconds(interval)); 
} else {
if (!fs.existsSync(path)) {
if (!fs.existsSync(path.substring(0, path.lastIndexOf('/')))) {
fs.mkdirSync(path.substring(0, path.lastIndexOf('/')), { recursive: true });
}

fs.writeFileSync(`${path}.bson`, BSON.serialize(db));
}
}

if(this.useEmit) { 
this.emit('backup', true);
}
return true;
}

move(quickdb) {
quickdb.all().then(data => {
data.forEach(data => {
this.set(data.id, data.value)
})
})
if(this.useEmit) { 
this.emit('move', true);
}
return true;
}

destroy() {
fs.unlinkSync(this.path);
if(this.useEmit) { 
this.emit('destroy', true);
}
return true;
}


get(key) {
if(!key) throw new Error("Key not specified.", "KeyError");
if(typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
return this.fetch(key)
}

type(key) {
if(!key) throw new Error("Key not specified.", "KeyError")
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path);
let keyPath = key;

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
const lastKey = keySplit.pop();
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
current[currentKey] = {};
}

current = current[currentKey];
}

keyPath = lastKey;
db = current;
}

if (!db[keyPath]) return null;

if (Array.isArray(db[keyPath])) return "array";
return typeof db[keyPath]; 
}

delete(key) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");

let db = read(this.path);
let keyParts = key.split(this.separator);

if (this.separator && keyParts.length > 1) {
let obj = db;
for (let i = 0; i < keyParts.length - 1; i++) {
obj = obj[keyParts[i]];
if (!obj) return null;
}
delete obj[keyParts[keyParts.length - 1]];
} else {
if (db[key] !== undefined) { 
delete db[key];
} else {
return null;
}
}

save(this.path, db);
if(this.useEmit) { 
this.emit('delete', key);
}
return true;
}

fetchAll() {
return read(this.path)
}

includesDelete(searchKey) {
if (!searchKey) throw new Error("Key not specified.", "KeyError");
if (typeof searchKey !== "string") throw new Error("Key needs to be a string.", "KeyError");

const db = this.read(this.path);
let deletedCount = 0;

const deleteRecursive = (obj, searchKey) => {
for (const key in obj) {
if (key.includes(searchKey)) {

delete obj[key];
deletedCount++;
if (this.useEmit) {
this.emit('includesDelete', key);
}
} else if (typeof obj[key] === 'object' && obj[key] !== null) {

deleteRecursive(obj[key], searchKey);

if (Object.keys(obj[key]).length === 0) {
delete obj[key];
if(this.useEmit) { 
this.emit('includesDelete', key);
}
deletedCount++;
}
}
}
};

deleteRecursive(db, searchKey);

this.save(this.path, db);

return deletedCount > 0 ? true : null;
}

all(key = 'all') {
switch (key) {
case 'all':
return read(this.path)
case 'object':
return Object.entries(read(this.path))
case 'keys':
return Object.keys(read(this.path))
case 'values':
return Object.values(read(this.path))
}
}

length(key = 'all') {
switch (key) {
case 'all':
return this.all("object").length
case key:
return this.includes(key).length
}
}

startsWith(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");

const db = this.read(this.path);
const array = [];


for (const id in db) {
const keys = { ID: id, data: db[id] };
array.push(keys);
}

const keyParts = key.split(this.separator);

return array.filter(x => {
const idStartsWith = keyParts.every(part => x.ID.startsWith(part));

const dataStartsWith = (typeof x.data === 'object') && Object.keys(x.data).some(subKey => {
return keyParts.some(part => subKey.startsWith(part));
});

return idStartsWith || dataStartsWith;
});
}

endsWith(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");

const db = this.read(this.path);
const array = [];

for (const id in db) {
const keys = { ID: id, data: db[id] };
array.push(keys);
}

const keyParts = key.split(this.separator);

return array.filter(x => {
const idEndsWith = keyParts.every(part => x.ID.endsWith(part));

const dataEndsWith = (typeof x.data === 'object') && Object.keys(x.data).some(subKey => {
return keyParts.some(part => subKey.endsWith(part));
});

return idEndsWith || dataEndsWith;
});
}

includes(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");

const db = this.read(this.path);
const array = [];

for (const id in db) {
const keys = { ID: id, data: db[id] };
array.push(keys);
}

const keyParts = key.split(this.separator);

return array.filter(x => {
const idIncludes = keyParts.every(part => x.ID.includes(part));

const dataIncludes = (typeof x.data === 'object') && Object.keys(x.data).some(subKey => subKey.includes(key));

return idIncludes || dataIncludes;
});
}

push(key, value) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");

let db = read(this.path);
let keyPath = key;

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
const lastKey = keySplit.pop();
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
current[currentKey] = {};
}

current = current[currentKey];
}

keyPath = lastKey;
if (!Array.isArray(current[lastKey])) {
current[lastKey] = [value];
} else {
current[lastKey].push(value);
}
} else {
if (!Array.isArray(db[key])) {
db[key] = [value];
} else {
db[key].push(value);
}
}

save(this.path, db);
if(this.useEmit) { 
this.emit('push', { key, value});
}
return value;
}

pull(key, value) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");

let db = read(this.path);
let keyPath = key;
let found = false;

if (this.separator && key.includes(this.separator)) {
const keySplit = key.split(this.separator);
const lastKey = keySplit.pop();
let current = db;

for (const currentKey of keySplit) {
if (current[currentKey] === undefined) {
current[currentKey] = {};
}

current = current[currentKey];
}

keyPath = lastKey;
if (Array.isArray(current[lastKey])) {
current[lastKey] = current[lastKey].filter((val) => {
if (val === value) {
found = true;
return false;
} else {
return true;
}
});
}
} else {
if (Array.isArray(db[key])) {
db[key] = db[key].filter((val) => {
if (val === value) {
found = true;
return false;
} else {
return true;
}
});
}
}

if (!found) {
return null;
}

save(this.path, db);
if(this.useEmit) { 
this.emit('pull', { key, value});
}
return true;
}


add(key, value) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");
if (typeof value !== "number") throw new Error("Value must be a number.", "ValueError");

let db = read(this.path);

let keyParts = key.split(this.separator);

let obj = db;

for (let i = 0; i < keyParts.length - 1; i++) {
obj = obj[keyParts[i]] = obj[keyParts[i]] || {};
}

let lastKey = keyParts[keyParts.length - 1];

if (typeof obj[lastKey] === "undefined") {
obj[lastKey] = Number(value);
} else {
obj[lastKey] = Number(obj[lastKey]) + Number(value);
}

save(this.path, db);
if(this.useEmit) { 
this.emit('add', { key, value});
}
return obj[lastKey];
}

sub(key, value) {
if(!key) throw new Error("Key not specified.", "KeyError");
if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");
if (typeof value !== "number") throw new Error("Value must be a number.", "ValueError");

let db = read(this.path);

let keyParts = key.split(this.separator);
let obj = db;

for (let i = 0; i < keyParts.length - 1; i++) {
obj = obj[keyParts[i]] = obj[keyParts[i]] || {};
}

let lastKey = keyParts[keyParts.length - 1];

if (typeof obj[lastKey] === "undefined") {
obj[lastKey] = -Number(value);
} else {
obj[lastKey] = Number(obj[lastKey]) - Number(value);
}

save(this.path, db);
if(this.useEmit) { 
this.emit('sub', { key, value});
}
return obj[lastKey];
}

}

module.exports = BsonProvider