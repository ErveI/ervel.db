<img src="https://readme-typing-svg.demolab.com/?font=Ubuntu&pause=1000&width=435&lines=Easy+to+use;Easy+to+switch;Beginner+Friendly;Advanced+Methods;All+In+One">

![Downloads](https://img.shields.io/npm/dt/ervel.db?&style=for-the-badge)
![DownloadPerMonth](https://img.shields.io/npm/dm/ervel.db?style=for-the-badge)
![Version](https://img.shields.io/npm/v/ervel.db?&style=for-the-badge)

## Updates

• Added separator support to the "includes", "startsWith", and "endsWith" functions, along with improvements to the "includesDelete" function for better key deletion efficiency.

• A new option has been added to local providers. When the "deleteEmptyObjects" option is enabled, any empty objects will be automatically removed after a deletion, ensuring cleaner data management.

## About

• Ervel.db is a beginner-friendly module that caters to new developers and allows easy usage of databases with a simple key-value structure. It encompasses popular database modules such as Mongodb, Bson, Yaml, and Json. In the future, it will be enriched with support for additional database types.

## Features
 
- Beginner friendly, All In One and Easy to use.
- Personalizable separator in JSON, BSON and YAML databases.
- Key and Value based methods.
- Quick to respond, read and write.
- Mongo Multiple model support.
- Easy to switch between JSON, BSON, YAML and Mongodb databases.
- Supports EventEmitter functions in JSON, BSON and YAML databases.
- Auto database typo fixer in JSON database.
- Auto Update Checker.
- Minify option on JSON database.

## Local Provider Usage

- Import the desired provider components from the library:

```javascript
const { YamlProvider, BsonProvider, JsonProvider } = require("ervel.db")
```

- Create an instance of the desired provider class with appropriate options:

```javascript
const db = new JsonProvider({}) // Every options is set to default.

const db = new JsonProvider({ // Alternatives, new YamlProvider({ and new BsonProvider({

path: "./files/advanceduser.json", // Optional, specify the path
separator: "*", // Optional, change separator
useEmit: true, // Optional, enable EventEmitter functions
checkUpdate: false, // Optional, disable module update checks
minify: true, // Optional, change database format
deleteEmptyObjects: true // Optional, enable Delete Empty Objects

});
```

## Local Provider Methods

- `db.set("key", "value")`: key: "value"

- `db.fetch("key")`: "value"

- `db.get("key")`: "value"

- `db.has("key")`: true

- `db.push("array", "data")`: array: ["data"]

- `db.pull("array", "data")`: array: []

- `db.fetchAll()`: { key: "value", array: [] }

- `db.all()`: { key: "value", array: [] }
- `db.all("object")`: [ [key: "value"], [array: []] ]
- `db.all("keys")`: ["key", "array"]
- `db.all("values")`: ["value", []]

- `db.length()`: Shows the number of data in the database.
- `db.length("key")`: Shows the number of data in the "key" data.

- `db.type("key")`: string

- `db.startsWith("key")`: Lists data entries whose keys start with the keyword "key". [ keyanime: "value" ]

- `db.endsWith("key")`: Lists data entries whose keys end with the keyword "key". [ animekey: "value" ]

- `db.includes("key")`: Lists data entries that include the keyword "key". [ animekey: "value", keyanime: "value" ]

- `db.delete("key")`: Deletes the "key" data.

- `db.includesDelete("key")`: Deletes all entries from the database that contain the specified "key". 

- `db.clear()`: Deletes all data in the database.

- `db.backup()`: Creates the ervel-backup.json file.
- `db.backup("./backup/file")`: Creates a backup file named "file" in the "./backup" directory.
- `db.backup("./backup/file", "1m")`: Automatically creates and updates a backup file named "file" in the "./backup" directory every 1 minute. 1s, 1m ,1h

- `db.move(quick)`: Moves Quick.db data to Local Provider.

- `db.add("number", 1)`: number: 2

- `db.sub("number", 1)`: number: 0

- `db.destroy()`: Deletes the database file.

- `db.size()`: Shows database size.

- `db.version()`: 3.6.1

## Moving Data From Quick.DB to Local Database
```javascript
const { JsonProvider } = require("ervel.db")
const db = new JsonProvider({})

const { QuickDB } = require("quick.db");
const quick = new QuickDB();

db.move(quick)
```

## Mongodb Provider Usage

- Import the provider component from the library:

```javascript
const { MongoProvider } = require("ervel.db")
```

- Create an instance of the provider class:

```javascript
const db = new MongoProvider("mongodb://localhost/ervel.db"); // Online database link or local database link
```

## Mongodb Provider Methods

- `db.set("key", "value")`: key: "value"

- `db.fetch("key")`: "value"

- `db.get("key")`: "value"

- `db.has("key")`: true

- `db.push("array", "data")`: array: ["data"]

- `db.pull("array", "data")`: array: []

- `db.fetchAll()`: { key: "value", array: [] }

- `db.all()`: { key: "value", array: [] }

- `db.export()`: Exports all data from the database.

- `db.import()`: Imports all data from the database.

- `db.type("key")`: string

- `db.uptime()`: Shows connection uptime.

- `db.connection()`: Shows connection status.

- `db.keyArray()`: ["key", "array"]

- `db.valueArray()`: ["value", []]

- `db.delete("key")`: Deletes the "key" data.

- `db.clear()`: Deletes all data in the database.

- `db.add("number", 1)`: number: 2

- `db.sub("number", 1)`: number: 0

- `db.move(quick)`: Moves Quick.db data to Mongodb database.

- `db.disconnect()`: Disconnects database connection.

- `db.createModel("name")`: Creates model.

- `db.updateModel("name")`: Updates the model name.

- `db.version()`: 3.6.1

## Moving Data From Quick.DB to Mongodb
```javascript
const { MongoProvider } = require("ervel.db");
const db = new MongoProvider("mongodb://localhost/ervel.db");

const { QuickDB } = require("quick.db");
const quick = new QuickDB();

db.move(quick)   
```

## EventEmitter Usage Example

- EventEmitter Options: set, clear, move, destroy, pull, push, delete, add, sub, backup, includesDelete

```javascript
const { JsonProvider } = require("ervel.db")
const db = new JsonProvider({ useEmit: true })

db.on('set', ({ key, value }) => {
console.log(`key: ${key} value: ${value}`);
});

db.set("test", "test")
```

- <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://www.npmjs.com/package/ervel.db">Ervel.db</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.npmjs.com/~ervel">Ervel</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0</a></p> 

- Do you have a suggestion or complaint? Feel free to reach me on Discord with the nickname [Ervel](http://discord.com/users/503285107331825664)