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

set(key, value) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");
let db = read(this.path)
db[key] = value;
save(this.path, db);
return db[key]
}


has(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path)
if (!db[key]) return false;
return true;
}

clear() {
save(this.path, {})
return true;
}

version(){
return require('../package.json').version;
}

backup(file) {
    if (!file) throw new Error('Specify the name of the backup file.')
    if (file.endsWith(".json")) throw new Error('Do not include file extensions in your filename.')
    if (file === this.path) throw new Error('The backup database name cannot have the same name as the database.')
    const db = JSON.parse(fs.readFileSync(this.path, 'utf8'))
    fs.writeFileSync(`${file}.json`, JSON.stringify(db, null, 2))
    return true;
}

move(quickdb) {
quickdb.all().then(data => {
data.forEach(data => {
this.set(data.id, data.value)
})
})
return true;
}

destroy() {
fs.unlinkSync(this.path);
return true;
}

fetch(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path)
if (!db[key]) return null;
return db[key]
}

get(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
return this.fetch(key)
}

type(key) {
if (!key) throw new Error("Key not specified.", "KeyError")
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path)
if (!db[key]) return null

if (Array.isArray(this.get(key))) return "array"
return typeof this.get(key);   
}

delete(key) {
if (!key) throw new Error("Key not specified.", "KeyError")
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
let db = read(this.path);
if (!db[key]) return null;
delete db[key];
save(this.path, db);
return true;
}

fetchAll() {
return read(this.path)
}

all(key = 'all') {
switch (key) {
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

startsWith(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
const db = read(this.path);
const array = [];
for (const key in db) {
const keys = { ID: key, data: db[key] };
array.push(keys);
}
return array.filter(x => x.ID.startsWith(key))
}

endsWith(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
const db = read(this.path);
const array = [];
for (const key in db) {
const keys = { ID: key, data: db[key] };
array.push(keys);
}
return array.filter(x => x.ID.endsWith(key))
}

includes(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
const db = read(this.path);
const array = [];
for (const key in db) {
const keys = { ID: key, data: db[key] };
array.push(keys);
}
return array.filter(x => x.ID.includes(key))
}

push(key, value) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");

if (!this.get(key)) {
return this.set(key, [value]);
}

if (Array.isArray(this.get(key))) {
var newvalue = this.get(key)
newvalue.push(value);
return this.set(key, newvalue);
}

return this.set(key, [value]);
}

add(key, value) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
if (!value) throw new Error("Value not specified.", "ValueError");
if(isNaN(value)) throw new Error("Value must be number.", "ValueError");
var db = read(this.path)

if(!db[key]) {
return this.set(key, Number(value))
}

return this.set(key, +Number(value))
}

sub(key, value) {
  if (!key) throw new Error("Key not specified.", "KeyError");
  if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
  if (!value) throw new Error("Value not specified.", "ValueError");
  if(isNaN(value)) throw new Error("Value must be number.", "ValueError");
  var db = read(this.path)
  
  if(!db[key]) {
  return this.set(key, -Number(value))
  }
  
  return this.set(key, -Number(value))
  }

}

module.exports = JsonProvider