const { PASSWORD } = require('./config')

const mongoURL = `mongodb+srv://anton:${PASSWORD}@cluster0-1fvmc.mongodb.net/telegram?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(mongoURL, { useUnifiedTopology: true });

module.exports = async function() {
  try {
    return await client.connect().then(err => {
      collection = client.db("telegram").collection("user").find({}).sort({ date: -1 }).toArray()
      collection.then(
        function(result) {
          console.log(result);
          let collection;
          collection = result;
          client.close();
        }
      );
    // console.log(err);
    return collection
    });
  } catch (error) {
    console.error(error);
  }
}