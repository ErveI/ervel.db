# What is Ervel.DB?

• Ervel.db module is a JSON and Mongo.DB based module developed by ERVEL. Ervel.DB is designed based on ease of use, as in Electra Discord Bot.

# Features of Ervel.DB
 
- Beginner friendly and easy to use.
- Simple and similar to Quick.db for easy to use.
- Multiple model support.
- Easy to switch between JSON and Mongo.db database.

# How to switch to Ervel.DB?

• Migrating to Ervel.DB is easy. Quick.db users can easily switch to Ervel.DB just by adapting the module require part and the module definition in the commands.

# How to use Mongo Ervel.DB?

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

db.destroy() //Deletes the database file.

db.disconnect() //Disconnects database connection.

db.connect() //Connects database connection.

db.ping() //Shows database ping.

db.createModel("name") //Creates model.

db.updateModel("name") //Update the model name.

db.version() //Shows Ervel.DB version.

```



# How to use Json Ervel.DB?

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

db.add("key", 1) //Adds 1 to the data named Key.

db.destroy() //Deletes the database file.

db.version() //Shows Ervel.DB version.
```




# How can I contact the developer?
• You can contact **ERVEL** from the [support server](https://discord.gg/JHHuYZRctN).
