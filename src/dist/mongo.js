const { Database } = require("quickmongo");
const { Logger } = require('@hammerhq/logger')
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
    if(!this.debugSuccess) logger.event("Hata ayıklama moduna giriş yapılıyor. Birkaç saniye bekleyiniz.")
setTimeout(function(){
    this.debugSuccess = true;
    logger.success("Hata ayıklama moduna başarıyla giriş yapıldı.")
},4000)
}
db.on("ready", () => {
    logger.event("Mongo.db veritabanına başarıyla Ervel.DB ile giriş yapıldı.");    
});
this.db = db;
this.debug = debug ? true : false

}

async confirmConnection(){
    if(this.connection) logger.info("Otomatik Bağlantı Onaylayıcı kuruldu.\nKapatmak için autoConfirm: false yapınız.")
    if(!this.connection) await this.db.connect();
    if(this.debug) logger.event("Bağlantı başarıyla onaylandı.")
        await this.db.connect()
}
async set(key,value){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)
    if(!value) throw Error(`Bir Value belirtmelisin.`)
    if(!this.connection) throw Error("Mongo.db'ye bağlantı stabil değil. Bağlantınızı **autoConfirm: true** ile kontrol ettirin.")
    if(this.debug) logger.event("Veri başarıyla kaydedildi.", `${key}:${value}`)
  
    return this.db.set(key, value);
 
}

async add(key,value){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)
    if(!value) throw Error(`Bir Value belirtmelisin.`)
    if(isNaN(value)) throw Error("Value sayı olmalıdır.");
    if(this.debug) logger.event("Veriye başarıyla verilen miktar eklendi.", `${key}:${value}`)
  
    
    await this.db.add(key, +value)
 }

async deleteOne(key,value){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)
    if(!value) throw Error(`Bir Value belirtmelisin.`)
    if(this.debug) logger.event("Data deleting has successfully.", `${key}:${value}`)
  
    await this.db.pull(key, [value])
 }

async push(key,value){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)
    if(!value) throw Error(`Bir Value belirtmelisin.`)
    if(this.debug) logger.event("Veri başarıyla pushlandı.", `${key}:${value}`)
  
    await this.db.push(key, value)
 }



async get(key){
   if(!key) throw Error(`Bir Veri belirtmelisin.`)
   if(this.debug) logger.event("Veri başarıyla çekildi.", `[${this.db.get(key)}]`)
        
    return await this.db.get(key)
  } 

  async type(key){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)

     return typeof this.db.get(key);   
 }

 async has(key){
    if(!key) throw Error(`Bir Veri belirtmelisin.`)
   return new Boolean(this.db.get(key));
}


version() {
    return require('../../package.json').version;
  }


        
}
module.exports = MongoProvider