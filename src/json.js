const { unlinkSync, writeFileSync, readFileSync, existsSync } = require('fs');

const oku = (file) => JSON.parse(readFileSync(file, 'utf-8'));
const yazdir = (file, data) => writeFileSync(file, JSON.stringify(data, null, 4));

class JsonProvider {
constructor(x) {
this.path = x || 'ervel.json'

if (!this.path.startsWith('./')) this.path = "./" + this.path
if (!this.path.endsWith(".json")) this.path = this.path + ".json"

if (!existsSync(this.path)) {
yazdir(this.path, {})
}
}

set(veri, value) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
if (!value) throw Error("Invalid value specified.", "ValueError");
let dbDosya = oku(this.path)
dbDosya[veri] = value;
yazdir(this.path, dbDosya);
return dbDosya[veri]
}

has(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
let dbDosya = oku(this.path)
if (!dbDosya[veri]) return false;
return true;
}

deleteAll() {
yazdir(this.path, {})
return true;
}

version(){
return require('../package.json').version;
}

destroy() {
unlinkSync(this.path);
return true;
}

fetch(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
let dbDosya = oku(this.path)
if (!dbDosya[veri]) return null;
return dbDosya[veri]
}

get(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
return this.fetch(veri)
}

type(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError")
let dbDosya = oku(this.path)
if (!dbDosya[veri]) return null

if (Array.isArray(this.get(veri))) return "Array"
return typeof this.get(veri);   
}

delete(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError")
let dbDosya = oku(this.path);
if (!dbDosya[veri]) return null;
delete dbDosya[veri];
yazdir(this.path, dbDosya);
return true;
}

fetchAll() {
return oku(this.path)
}

all(veri = 'all') {
switch (veri) {
case 'all':
return Object.entries(oku(this.path))
case 'object':
return oku(this.path)
case 'keys':
return Object.keys(oku(this.path))
case 'values':
return Object.values(oku(this.path))
}
}

length() {
return this.all().length
}

startsWith(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const dbDosya = oku(this.path);
const array = [];
for (const veri in dbDosya) {
const key = { ID: veri, data: dbDosya[veri] };
array.push(key);
}
return array.filter(x => x.ID.startsWith(veri))
}

endsWith(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const dbDosya = oku(this.path);
const array = [];
for (const veri in dbDosya) {
const key = { ID: veri, data: dbDosya[veri] };
array.push(key);
}
return array.filter(x => x.ID.endsWith(veri))
}

includes(veri) {
if (!veri) throw Error("Invalid key specified.", "KeyError");
const dbDosya = oku(this.path);
const array = [];
for (const veri in dbDosya) {
const key = { ID: veri, data: dbDosya[veri] };
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
var db = oku(this.path)

if(!db[veri]) {
return this.set(veri, +Number(value))
}

return this.set(veri, +Number(value))
}
}

module.exports = JsonProvider