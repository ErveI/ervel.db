const { Database } = require("quickmongo");
const { Logger } = require('@hammerhq/logger')
const axios = require('axios');
const logger = new Logger("[ErvelDB]:");
class MongoProvider {
     constructor({ connect, autoConfirm, debug }){
        
      const db = new Database(connect);
if(autoConfirm === true){
    this.connection = true;

   async function confirm() {
         db.connect()
    }
    confirm()
}
if(debug === true){
    if(!this.debugSuccess) logger.event("Entering to Debug mode, this will takes a few seconds.")
setTimeout(function(){
    this.debugSuccess = true;
    logger.success("Debug MODE Enabled now.")
},4000)
}
db.on("ready", () => {
    logger.event("Connected to Mongo.DB with Ervel.DB");    
});
this.db = db;
this.debug = debug ? true : false

}

async confirmConnection(){
    if(this.connection) logger.info("The Auto Connection Confirmer has been setup. if you want disable? Use 'autoConfirm: false'")
    if(!this.connection) await this.db.connect();
    if(this.debug) logger.event("The connection confirmed.")
        await this.db.connect()
}
async set(key,value){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
    if(!value) throw Error("invalidValue", `Please validate a value.`)
    if(!this.connection) throw Error("mongoConfirmError", "Wait and confirm your connection.")
    if(this.debug) logger.event("Data has been set successfully.", `${key}:${value}`)
  
    return this.db.set(key, value);
 
}

async add(key,value){
    if(!key) logger.error("invalidKey", `Please validate a key.`)
    if(!value) logger.error("invalidValue", `Please validate a value.`)
    if(this.debug) logger.event("Data add has successfully.", `${key}:${value}`)
  
    
    await this.db.add(key, +value)
 }

async delete(key){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
    if(this.debug) logger.event("Data has been deleted successfully.", `${key}:${value}`)
  
    await this.db.pull(key)
 }

async push(key,value){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
    if(!value) throw Error("invalidValue", `Please validate a value.`)
    if(this.debug) logger.event("Data push has successfully.", `${key}:${value}`)
  
    await this.db.push(key, value)
 }



async get(key){
   if(!key) throw Error("invalidKey", `Please validate a key.`)
   if(this.debug) logger.event("Data has been getted successfully.", `[${this.db.get(key)}]`)
        
    return await this.db.get(key)
  } 

  async type(key){
    if(!key) throw Error("invalidKey", `Please validate a key.`)

     return typeof this.db.get(key);   
 }

 async has(key){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
   return new Boolean(this.db.get(key));
}


 async version() {
    const response = await axios.get(`https://raw.githubusercontent.com/ErveI/ervel.db/Readme.md/erveldb/package.json`)
    return response.data.version
  }

async all(){
    this.db.all().then(console.log);
}

async length() {
    return this.db.all().length
         }

         async ping(options = {}){
            const calculate = await Date.now() - this.ping;
             return calculate
        }
        
}
module.exports = MongoProvider