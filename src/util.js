const lodash = require("lodash");



class Util {

constructor() {
throw Error(`${this.constructor.name} sınıfı başlatılamamış olabilir!`);
}


static isKey(str) {
return typeof str === "string";
}

static isValue(data) {
if (data === Infinity || data === -Infinity) return false;
if (typeof data === "undefined") return false;
return true;
}



static parseKey(key) {
if (!key || typeof key !== "string") return { key: undefined, target: undefined };
if (key.includes(".")) {
let spl = key.split(".");
let parsed = spl.shift();
let target = spl.join(".");
return { key: parsed, target };
}
return { key, target: undefined };
}

static sort(key, data, ops) {

if (!key || !data || !Array.isArray(data)) return [];

let arb = data.filter(i => i.ID.startsWith(key));

if (ops && ops.sort && typeof ops.sort === 'string') {

if (ops.sort.startsWith('.')) ops.sort = ops.sort.slice(1);

ops.sort = ops.sort.split('.');

arb = lodash.sortBy(arb, ops.sort).reverse();

}

return arb;

}

static setData(key, data, value) {

let parsed = this.parseKey(key);

if (typeof data === "object" && parsed.target) {

return lodash.set(data, parsed.target, value);

} else if (parsed.target) throw Error("Nesne olmayan hedeflenemez.");

return data;

}


static unsetData(key, data) {

let parsed = this.parseKey(key);

let item = data;

if (typeof data === "object" && parsed.target) {

lodash.unset(item, parsed.target);

} else if (parsed.target) throw Error("Nesne olmayan hedeflenemez.");

return item;

}


static getData(key, data) {

let parsed = this.parseKey(key);

if (parsed.target) data = lodash.get(data, parsed.target);

return data;

}

}



module.exports = Util;