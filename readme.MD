[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=Easy+to+use;Beginner+Friendly;Advanced+Usage)](https://git.io/typing-svg)

![Image](https://img.shields.io/npm/dt/ervel.db.svg?color=%2351FC0&maxAge=100)

## Changes

- Added db.backup method to JSON

## What is Ervel.DB?

• Ervel.DB is a user-friendly module developed by ERVEL that is based on JSON and Mongo.DB. It has been designed with ease of use in mind. With Ervel.DB, users can easily store and retrieve data using JSON files or a MongoDB database. It offers a straightforward approach to data management that is both efficient and convenient.

## Features of Ervel.DB
 
- Beginner friendly and easy to use.
- Simple and similar to **[Quick.db](https://npmjs.com/package/quick.db)** for easy to use.
- Multiple model support.
- Easy to switch between JSON and Mongo.db database.

## How to switch to Ervel.DB?

• Migrating to Ervel.DB is a simple process, especially for users who are familiar with Quick.db. To make the switch, all that's required is to adjust the module require section and module definition in the commands. This transition is hassle-free and won't require a significant amount of time or effort. With Ervel.DB, users can take advantage of an easy-to-use module that offers additional features and improved performance compared to Quick.db.

## All Mongo Methods
```js
const { MongoProvider } = require("ervel.db");
const db = new MongoProvider("mongodb://localhost/ervel.db");

db.on("ready", () => {
    console.log("Successfuly connected Mongo.db database with Ervel.db");
});

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

db.add("key", 1) //Adds 1 to the data named Key.

db.destroy() //Deletes the database file.

db.version() //Shows Ervel.DB version.
```
