const { unlinkSync, writeFileSync, readFileSync } = require('fs');
const axios = require('axios');

const deleteALL = (file, data) => writeFileSync(file, JSON.stringify(data, null, 4));
const read = (file) => JSON.parse(readFileSync(file, 'utf-8'));


class JsonProvider {
      constructor({ path, interval }){
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
async save(){
const PING = Date.now()
    this.ping = PING;
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), "utf-8");
}


async set(key,value){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
    if(!value) throw Error("invalidValue", `Please validate a value.`)

 this.data[key] = value;
   await this.save()
    return `Successfully added to database.`
}

async has(key){
    if(!key) throw Error("invalidKey", `Please validate a key.`)
   return new Boolean(this.data[key]);
}

async deleteAll(){
    deleteALL(this.data, {})
    return `All data has been deleted successfully.`
}

 async version() {
    const response = await axios.get(`https://raw.githubusercontent.com/ErveI/ervel.db/Readme.md/erveldb/package.json`)
    return response.data.version
  }

  async destroy() {
    unlinkSync(this.data);
    return true;
}

async fetch(key) {
    if (!key) throw Error("invalidKey", `Please validate a key.`)
    let fetch = read(this.data)
    if (!fetch[key]) return null;
    return fetch[key]
}


    async get(key){
        if(!key) throw Error("invalidKey", `Please validate a key.`)
       return this.data[key];
    }

    async type(key){
        if(!key) throw Error("invalidKey", `Please validate a key.`)
 
         return typeof this.data[key];   
     }

     async delete(key){
        if(!key) throw Error("invalidKey", `Please validate a key.`) 
        
        delete this.data[key];
        this.save();
        return `Deleted.`
    }

    async fetchAll() {
        return read(this.data)
    }

    async all(veri = 'all') {
        switch (veri) {
            case 'all':
                return Object.entries(oku(this.data))
            case 'object':
                return oku(this.path)
            case 'keys':
                return Object.keys(oku(this.data))
            case 'values':
                return Object.values(oku(this.data))
        }
    }

    async length() {
   return this.all().length
        }

     async startsWith(veri) {
            if (!veri) throw Error("invalidKey", `Please validate a key.`)
            const dbDosya = read(this.data);
            const array = [];
            for (const veri in dbDosya) {
                const key = { ID: veri, data: dbDosya[veri] };
                array.push(key);
            }
            return array.filter(x => x.ID.startsWith(veri))
        }

        async endsWith(veri) {
            if (!veri) throw Error("invalidKey", `Please validate a key.`)
            const dbDosya = read(this.data);
            const array = [];
            for (const veri in dbDosya) {
                const key = { ID: veri, data: dbDosya[veri] };
                array.push(key);
            }
            return array.filter(x => x.ID.endsWith(veri))
        }

       async includes(veri) {
            if (!veri) throw Error("invalidKey", `Please validate a key.`)
            const dbDosya = read(this.data);
            const array = [];
            for (const veri in dbDosya) {
                const key = { ID: veri, data: dbDosya[veri] };
                array.push(key);
            }
            return array.filter(x => x.ID.includes(veri))
        }

        async push(key,body){
            if(!key) throw Error("invalidKey", `Please validate a key.`)
            if(!body) throw Error("invalidBody", `Please validate an Array or Body.`)
   
           if (!this.data[key]) this.data[key] = [];
           this.data[key].push(body);
           this.save();
           return body;
           
       }

       async add(key,value){
        if(!key) logger.error("invalidKey", `Please validate a key.`)
        if(!value) logger.error("invalidValue", `Please validate a value.`)
       
       if(!this.path[key]) this.data[key] = 0;
       this.data[key] += count;
       this.save();
       return `Added.`   
    }

    async toString(){
        return JSON.stringify(this.data);
    }
    async toJSON(){
        return JSON.parse(JSON.stringify(this.data));
    }

    async arrayHas(veri) {
        let dbDosya = read(this.data)
        if (!veri) throw Error("invalidKey", `Please validate a key.`)
        if (!dbDosya[veri]) return null;

        if (Array.isArray(this.data(veri))) return true
        return false
    }

}
module.exports = JsonProvider