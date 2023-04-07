const EventEmitter = require("events").EventEmitter;
const mongoose = require("mongoose");

class Base extends EventEmitter {


    constructor(mongodbURL, connectionOptions={}) {

        super();

        if (!mongodbURL) throw Error("No mongodb url was provided.");
        if (typeof mongodbURL !== "string") throw Error(`Expected a string for mongodbURL, ${typeof mongodbURL}`);
        if (connectionOptions && typeof connectionOptions !== "object") throw Error(`Expected Object for connectionOptions, ${typeof connectionOptions}`);

        Object.defineProperty(this, "dbURL", { value: mongodbURL });

        this.options = connectionOptions;

        this.connection = this.create();

        this.connection.on("error", (e) => {
        this.emit("error", e);
        });

        this.connection.on("open", () => {
        this.readyAt = new Date();
        this.emit("ready");
        });

    }

    create(url) {
        this.emit("debug", "Creating database connection...");
        if (url && typeof url === "string") this.dbURL = url;
        if (!this.dbURL || typeof this.dbURL !== "string") throw Error("Database url was not provided.", "MongoError");
        delete this.options["useUnique"];
        return mongoose.createConnection(this.dbURL, { ...this.options, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    }


    destroyDatabase() {
        this.connection.close(true);
        this.readyAt = undefined;
        this.dbURL = null;
        this.emit("debug", "Database disconnected!");
    }

    get url() {
    return this.dbURL;
    }


    get state() {

        if (!this.connection || typeof this.connection.readyState !== "number") return "DISCONNECTED";

        switch(this.connection.readyState) {

            case 0:

                return "DISCONNECTED";

            case 1:

                return "CONNECTED WITH ERVEL.DB";

            case 2:

                return "CONNECTING";

            case 3:

                return "DISCONNECTING";

        }

    }

}

module.exports = Base;