const fs = require("fs");
const YAML = require("yaml");
const read = (file) => YAML.parse(fs.readFileSync(file, 'utf-8'));
const save = (file, data) => fs.writeFileSync(file, YAML.stringify(data, null, 4));

class YamlProvider {
constructor(x, options) {
this.path = x || 'ervel.yaml'
this.separator = options || '.';
if (!this.path.startsWith('./')) this.path = "./" + this.path
if (!this.path.endsWith(".yaml")) this.path = this.path + ".yaml"

if (!fs.existsSync(this.path)) {
save(this.path, {})
}
}

  set(key, value) {
    if (!key) throw new Error("Key not specified.", "KeyError");
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
    return value;
  }

  fetch(key) {
    if (!key) throw new Error("Key not specified.", "KeyError");
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


  fileSize() {
    let stats = (0, fs.statSync)(`${this.path}`);
    return { byte: stats.size, megabyte: stats.size / (1024 * 1024), kilobyte: stats.size / (1024) };
}

has(key) {
  if (!key) throw new Error("Key not specified.", "KeyError");
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
return true;
}

version(){
return require('../package.json').version;
}

backup(file) {
    if (!file) throw new Error('Specify the name of the backup file.')
    if (file.endsWith(".yaml")) throw new Error('Do not include file extensions in your filename.')
    if (file === this.path) throw new Error('The backup database name cannot have the same name as the database.')
    const db = YAML.parse(fs.readFileSync(this.path, 'utf8'))
    fs.writeFileSync(`${file}.yaml`, YAML.stringify(db, null, 2))
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


get(key) {
if (!key) throw new Error("Key not specified.", "KeyError");
if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
return this.fetch(key)
}

type(key) {
  if (!key) throw new Error("Key not specified.", "KeyError")
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
  if (!key) throw new Error("Key not specified.", "KeyError");
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
    if (!db[key]) return null;
    delete db[key];
  }
  
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
  return value;
}

pull(key, value) {
    if (!key) throw new Error("Key not specified.", "KeyError");
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
    return true;
  }


add(key, value) {
  if (!key) throw new Error("Key not specified.", "KeyError");
  if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
  if (!value) throw new Error("Value not specified.", "ValueError");
  if(isNaN(value)) throw new Error("Value must be number.", "ValueError");
  
  let db = read(this.path);

  
  let keyParts = key.split(this.separator);


  
  let obj = db;

  for(let i = 0; i < keyParts.length - 1; i++) {
    obj = obj[keyParts[i]] = obj[keyParts[i]] || {};
  }


  
  let lastKey = keyParts[keyParts.length - 1];

  
  if (typeof obj[lastKey] === "undefined") {
    this.set(key, Number(value));
    return value;
  } else {
    obj[lastKey] = Number(obj[lastKey] || 0) + Number(value);
    save(this.path, db);
    return obj[lastKey];
  }
}

sub(key, value) {
  if (!key) throw new Error("Key not specified.", "KeyError");
  if(typeof key != "string") throw new Error("Key needs to be a string.", "KeyError");
  if (!value) throw new Error("Value not specified.", "ValueError");
  if(isNaN(value)) throw new Error("Value must be number.", "ValueError");

  let db = read(this.path);

  let keyParts = key.split(this.separator);
  let obj = db;

  for(let i = 0; i < keyParts.length - 1; i++) {
    obj = obj[keyParts[i]] = obj[keyParts[i]] || {};
  }


  
  let lastKey = keyParts[keyParts.length - 1];

  if (typeof obj[lastKey] === "undefined") {
    this.set(key, -Number(value));
    return value;
  } else {
    obj[lastKey] = Number(obj[lastKey] || 0) - Number(value);
    save(this.path, db);
    return obj[lastKey];
  }

}

}

module.exports = YamlProvider