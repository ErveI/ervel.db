# Ervel.DB modülü nedir?

• Electra Discord botun geliştiricisi olan ERVEL tarafından geliştirilen JSON ve Mongo.DB tabanlı bir modüldür. Ervel.DB'de, Electra'da da olduğu gibi kolay kullanım baz alınarak tasarlanmıştır.

# Ervel.DB'ye nasıl geçiş yapılır?

• Ervel.DB'ye geçiş yapmak kolaydır. Quick.db kullanıcıları, sadece modül require kısmını ve komutlardaki modül tanımlamayı Ervel.DB'ye uyarlayarak kolaylıkla geçiş yapabilmektedir.

# Mongo Ervel.DB nasıl kullanılır?

```js
const { MongoProvider } = require("ervel.db")
const db = new MongoProvider(url);


db.set("key", "value") Key adlı veriyi, veri tabanına kaydeder.

db.get("key") Key adlı veriyi, veri tabanından çeker.

db.has("key") Key adında veri, veri tabanında varsa true, yoksa false olarak cevap verir.

db.delete("key") Key adlı veriyi, veri tabanından siler.

db.add("key", 1) Key adlı veriye 1 ekler.

db.length() Veri tabanındaki, toplam veri sayısını gösterir.

db.push("key", "value") Key adlı veriye, Arraylı olarak value kaydeder.

db.type("key") Key adlı verinin, veri türünü gösterir.

db.ping() Veri tabanı gecikmesini ölçer.

db.version() Ervel.DB sürümünü gösterir.

```



# Json Ervel.DB nasıl kullanılır?

```js

const { JsonProvider } = require("ervel.db")
const db = new JsonProvider("./ervel.json") JSON dosya adı ve tanımlama kişileştirilebilir.

db.set("key", "value") Key adlı veriyi, veri tabanına kaydeder.

db.fetch("key") Key adlı veriyi, veri tabanından çeker.

db.get("key") Key adlı veriyi, veri tabanından çeker.

db.has("key") Key adında veri, veri tabanında varsa true, yoksa false olarak cevap verir.

db.arrayHas("key") Key adlı veri Arraylı ise true, Arraysız ise false olarak cevap verir.

db.push("key", "value") Key adlı veriyi, Arraylı olarak veri tabanına kaydeder.

db.fetchAll() Veri tabanındaki, tüm verileri çeker.

db.all() Veri tabanındaki, tüm verileri gözden geçirir.

db.length() Veri tabanındaki, toplam veri sayısını gösterir.

db.type("key") Key adlı verinin, veri türünü gösterir.

db.startsWith("key") Veri Tabanında, Key adı ile başlayan verileri gözden geçirir.

db.endsWith("key") Veri tabanında, Key adı ile biten verileri gözden geçirir.

db.includes("key") Veri tabanında, Key adı içeren verileri gözden geçirir.

db.delete("key") Key adlı veriyi, veri tabanından siler.

db.deleteAll() Veri tabanındaki, tüm verileri siler.

db.add("key", 1) Key adlı veriye 1 ekler.

db.destroy() Veri tabanı dosyasını siler.

db.version() Ervel.DB sürümünü gösterir.
```




# Geliştiriciyle nasıl iletişime geçebilirim?
• [Destek sunucusundan](https://discord.gg/JHHuYZRctN) **ERVEL** ile iletişime geçebilirsiniz.
