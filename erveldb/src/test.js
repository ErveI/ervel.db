import {MongoProvider} from './index.js'
import {JsonProvider} from './index.js'
const db = new MongoProvider({
    connect:process.env.mongo,
    debug: true
})
db.confirmConnection()
    async function test() {
   await db.confirmConnection()
    //await db.deleteOne(`ervel`, "oa")
   //await db.deleteOne(`giveaway`, "oa")
   //await db.all()     
  console.log( await db.get(`ervel`) )
} 
test()
