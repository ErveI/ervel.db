const redis = require('redis')
class RedisProvider {
    constructor(url){
     if(!url) throw new Error("Provide Redis Connection Link.", "UrlError")
     if(!url.startsWith("redis://")) throw new Error("The provided url must be starts with redis://", "UrlError")
     this.url = url;

     this.client = redis({ url: this.url })
    }

   async connect(){
       await this.client.connect()
       return "Redis Client has been connected successfully."
      }  
    async disconnect(){
        await this.client.disconnect()
        return "Redis Client has been stopped sucessfully."
    }
    once(event){
        if(typeof event !== "string") throw new Error("Key needs to be a string.", "KeyError")
        this.client.on(eventName, (d) => {
            return d;
        })
    }
   async set(key,value){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    if (!value) throw new Error("Value not specified.", "ValueError");
    await this.client.set(key,JSON.stringify(value))
    }
   async get(key){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    const data = await this.client.get(key)
    return data;
   }
   async raw(key){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    if (!value) throw new Error("Value not specified.", "ValueError");
    const data = await this.client.hGetAll(key)
    return data;
   }
   async push(key,value){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    if (!value) throw new Error("Value not specified.", "ValueError");
    if(typeof value !== "object") throw new Error("Value needs to be a object.", "ValueError")
    
    await this.client.lPush(key,[value])
   }
   async add(key,value,count){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    if (!value) throw new Error("Value not specified.", "ValueError");
    if(typeof value !== "string") throw new Error("Value needs to be a string.", "ValueError")
    if (!count) throw new Error("Count not specified.", "CountError");
    if(typeof count !== "number") throw new Error("Count needs to be a number.", "CountError")
   
    await this.client.incrBy(key, { item: value, incrementBy: count })
   }

   async sub(key,value,count){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if (typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError");
    if (!value) throw new Error("Value not specified.", "ValueError");
    if(typeof value !== "string") throw new Error("Value needs to be a string.", "ValueError")
    if (!count) throw new Error("Count not specified.", "CountError");
    if(typeof count !== "number") throw new Error("Count needs to be a number.", "CountError")
   
    await this.client.incrBy(key, { item: value, incrementBy: -count })
   }

   async search(type, match, count){
    if (!type) throw new Error("Type not specified.", "KeyError");
    if(typeof type !== "string") throw new Error("Type needs to be a string.", "KeyError")
    if (!match) throw new Error("Match not specified.", "ValueError");
    if(typeof match !== "string") throw new Error("Match needs to be a string.", "ValueError")
    if (!count) throw new Error("Count not specified.", "CountError");
    if(typeof count !== "number") throw new Error("Count needs to be a number.", "CountError")
    const matchs = match.toLowerCase()
    const matched = type.toLowerCase()
       const data = await this.client.scanIterator({TYPE: matched, MATCH: `${matchs}*`, COUNT: count});
       return data;
   }
   async delete(key){
    if (!key) throw new Error("Key not specified.", "KeyError");
    if(typeof key !== "string") throw new Error("Key needs to be a string.", "KeyError")
      
       await this.client.del(key)
   }
   async ping(){
    const serverTime = await this.client.time();
    return serverTime.microseconds;
   }
    move(quickdb){
       quickdb.all().then((data) => {
        data.forEach(async (x) => {
            await this.client.set(x.id, x.value)
        })
       })
   } 

   version(){
    return require('../package.json').version;
    }
    
}

module.exports = RedisProvider