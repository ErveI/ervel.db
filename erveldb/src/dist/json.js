import fs from 'fs'
import { Logger } from '@hammerhq/logger'
const logger = new Logger("[ErvelDB]:");
let dcURL = ""
export default class JsonProvider {
    constructor({ path, interval }){
    // if(!path) logger.error("invalidDatabaseFilePath", `Please validate Database Folder Path. You think its a mistake? Contact: ${dcURL}`);
    this.path = path ? path : "./ervel.db.json";
    this.interval = interval ? interval : 0;  
        this.data = {};

        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "{}", "utf-8");
        } else {
            const savedData = JSON.parse(fs.readFileSync(this.path));
        if(typeof savedData === "object"){
            this.data = savedData;
        }
        }
    }
   /* Databse utils*/
async save(){
const PING = Date.now()
    this.ping = PING;
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), "utf-8");
}
    /* Database Commands */
    async get(key){
        if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`)
       return this.data[key];
    }
    async has(key){
        if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`)
       return new Boolean(this.data[key]);
    }
    async toString(){
        return JSON.stringify(this.data);
    }
    async toJSON(){
        return JSON.parse(JSON.stringify(this.data));
    }
    async set(key,value){
        if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`)
        if(!value) logger.error("invalidValue", `Please validate a value. You think its a mistake? Contact: ${dcURL}`)

     this.data[key] = value;
       await this.save()
        return `Added.`
    }
     async add(key,value){
         if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`)
         if(!value) logger.error("invalidValue", `Please validate a value. You think its a mistake? Contact: ${dcURL}`)
        
        if(!this.data[key]) this.data[key] = 0;
        this.data[key] += count;
        this.save();
        return `Added.`   
     }
    async delete(key){
        if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`) 
        
        delete this.data[key];
        this.save();
        return `Deleted.`
    }
    async push(key,body){
         if(!key) logger.error("invalidKey", `Please validate a key. You think its a mistake? Contact: ${dcURL}`)
         if(!body) logger.error("invalidBody", `Please validate an Array or Body. You think its a mistake? Contact: ${dcURL}`)

        if (!this.data[key]) this.data[key] = [];
        this.data[key].push(body);
        this.save();
        return body;
        
    }
    async ping(options = {}){
        const calculate = await Date.now() - this.ping;
         return {
             ping:`${calculate}ms`
         }

    }
}