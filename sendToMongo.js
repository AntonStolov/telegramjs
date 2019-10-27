const { PASSWORD } = require('./config')

const mongoURL = `mongodb+srv://anton:${PASSWORD}@cluster0-1fvmc.mongodb.net/telegram?retryWrites=true&w=majority`;
let DATAQuery;
// const obj = { name: "Company Inc", address: "Highway 37" };


const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(mongoURL, { useUnifiedTopology: true });

module.exports = function (obj) {
  client.connect(err => {
    const collection = client.db("telegram").collection("user").insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.close();
      });
//   console.log(err);
  })
}