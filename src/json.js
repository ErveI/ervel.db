const fs = require('fs')
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const save = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 4));

class JsonProvider {
constructor(x) {
this.path = x || 'ervel.json'

if (!this.path.startsWith('./')) this.path = "./" + this.path
if (!this.path.endsWith(".json")) this.path = this.path + ".json"

if (!fs.existsSync(this.path)) {
save(this.path, {})
}
}

set(veri, value) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
if (!value) throw Error("Invalid value specified.", "ValueError");
let db = read(this.path)
db[veri] = value;
save(this.path, db);
return db[veri]
}

has(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
let db = read(this.path)
if (!db[veri]) return false;
return true;
}

deleteAll() {
save(this.path, {})
return true;
}

version(){
return require('../package.json').version;
}

backup(file) {
    if (!file) throw Error('Specify the name of the backup file.')
    if (file.endsWith(".json")) throw Error('Do not include file extensions in your filename.')
    if (file === this.path) throw Error('The backup database name cannot have the same name as the database.')
    const db = JSON.parse(fs.readFileSync(this.path, 'utf8'))
    fs.writeFileSync(`${file}.json`, JSON.stringify(db, null, 2))
    return true;
}

destroy() {
fs.unlinkSync(this.path);
return true;
}

fetch(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
let db = read(this.path)
if (!db[veri]) return null;
return db[veri]
}

get(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
return this.fetch(veri)
}

type(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError")
let db = read(this.path)
if (!db[veri]) return null

if (Array.isArray(this.get(veri))) return "Array"
return typeof this.get(veri);   
}

delete(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError")
let db = read(this.path);
if (!db[veri]) return null;
delete db[veri];
save(this.path, db);
return true;
}

fetchAll() {
return read(this.path)
}

all(veri = 'all') {
switch (veri) {
case 'all':
return Object.entries(read(this.path))
case 'object':
return read(this.path)
case 'keys':
return Object.keys(read(this.path))
case 'values':
return Object.values(read(this.path))
}
}

length() {
return this.all().length
}

startsWith(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const db = read(this.path);
const array = [];
for (const veri in db) {
const key = { ID: veri, data: db[veri] };
array.push(key);
}
return array.filter(x => x.ID.startsWith(veri))
}

endsWith(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const db = read(this.path);
const array = [];
for (const veri in db) {
const key = { ID: veri, data: db[veri] };
array.push(key);
}
return array.filter(x => x.ID.endsWith(veri))
}

includes(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const db = read(this.path);
const array = [];
for (const veri in db) {
const key = { ID: veri, data: db[veri] };
array.push(key);
}
return array.filter(x => x.ID.includes(veri))
}

push(veri, value) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
if (!value) throw Error("Invalid value specified.", "ValueError");

if (!this.get(veri)) {
return this.set(veri, [value]);
}

if (Array.isArray(this.get(veri))) {
var yenivalue = this.get(veri)
yenivalue.push(value);
return this.set(veri, yenivalue);
}

return this.set(veri, [value]);
}

add(veri, value) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
if (!value) throw Error("Invalid value specified.", "ValueError");
if(isNaN(value)) throw Error("Value must be number.", "ValueError");
var db = read(this.path)

if(!db[veri]) {
return this.set(veri, +Number(value))
}

return this.set(veri, +Number(value))
}
}

module.exports = JsonProvider