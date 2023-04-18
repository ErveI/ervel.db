[![Typing SVG](https://readme-typing-svg.demolab.com?font=Ubuntu&pause=1000&width=435&lines=Easy+to+use;Easy+to+switch;Beginner+Friendly;Advanced+Methods)](https://git.io/typing-svg)

![Downloads](https://img.shields.io/npm/dt/ervel.db.svg)

## Changes

- Added db.backup and db.move method to JSON

## What is Ervel.DB?

• Ervel.DB is a user-friendly module developed by ERVEL that is based on JSON and Mongo.DB. It has been designed with ease of use in mind. With Ervel.DB, users can easily store and retrieve data using JSON files or a MongoDB database. It offers a straightforward approach to data management that is both efficient and convenient.

## Features of Ervel.DB
 
- Beginner friendly and easy to use.
- Simple and similar to **[Quick.db](https://npmjs.com/package/quick.db)** for easy to use.
- Multiple model support.
- Easy to switch between JSON and Mongo.db database.

## Moving Data From Quick.DB to Mongo Ervel.db
```js
const { MongoProvider } = require("ervel.db");
const db = new MongoProvider("mongodb://localhost/ervel.db");
const { QuickDB } = require("quick.db");
const quick = new QuickDB();

db.move(quick)   
```

## Moving Data From Quick.DB to Json Ervel.db
```js
const { JsonProvider } = require("ervel.db")
const db = new JsonProvider("./ervel.json") 
const { QuickDB } = require("quick.db");
const quick = new QuickDB();

db.move(quick)
```

## All Mongo Methods
```js
const { MongoProvider } = require("ervel.db");
const db = new MongoProvider("mongodb://localhost/ervel.db");

db.set("key", "value") //Saves the data named Key to the database.

db.fetch("key") // Pulls key data from database.

db.get("key") //Get the key data from the database.

db.has("key") // Returns true if the data named Key exists in the database, or false otherwise.

db.push("key", "value") //Saves the data named Key to the database as an Array.

db.fetchAll() //Retrieves all data from the database.

db.all() //Reviews all data in the database.

db.export() //Exports all data from the database.

db.import() //Imports all data from the database.

db.type("key") // Indicates the data type of the data named Key.

db.keyArray() //Shows all Key data from the database.

db.valueArray() //Shows all Value data from the database.

db.pull() //Pulls arrayed data from database.

db.delete("key") //Deletes the data named Key from the database.

db.deleteAll() //Delete all data in the database.

db.add("key", 1) //Adds 1 to the data named Key.

db.sub("key", 1) //Subtract 1 to the data named Key.

db.move(quick) //Move Quick.db data to Mongoose database.

db.disconnect() //Disconnects database connection.

db.createModel("name") //Creates model.

db.updateModel("name") //Update the model name.

db.version() //Shows Ervel.DB version.
```

## All Json Methods
```js
const { JsonProvider } = require("ervel.db")
const db = new JsonProvider("./ervel.json") //The JSON file name and file location can be personalized.

db.set("key", "value") //Saves the data named Key to the database.

db.fetch("key") // Pulls key data from database.

db.get("key") //Get the key data from the database.

db.has("key") // Returns true if the data named Key exists in the database, or false otherwise.

db.push("key", "value") //Saves the data named Key to the database as an Array.

db.fetchAll() //Retrieves all data from the database.

db.all() //Reviews all data in the database.

db.length() // Shows the total number of data in the database.

db.type("key") // Indicates the data type of the data named Key.

db.startsWith("key") //Reviews data in the database that starts with the name Key.

db.endsWith("key") //Reviews data in the database that ends with the name Key.

db.includes("key") //Reviews data in the database containing the Key name.

db.delete("key") //Deletes the data named Key from the database.

db.deleteAll() //Delete all data in the database.

db.backup("filename") //Backup the database.

db.move(quick) //Move Quick.db data to Json database.

db.add("key", 1) //Add 1 to the data named Key.

db.sub("key", 1) //Subtract 1 to the data named Key.

db.destroy() //Deletes the database file.

db.version() //Shows Ervel.DB version.
```
