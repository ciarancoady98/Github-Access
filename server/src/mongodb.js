const MongoClient = require("mongodb").MongoClient;
const inquirer = require("./inquirer");
const mongodbApiKeys = require("./mongodbApiKeys");

module.exports = {
  buildMongoClient: async () => {
    const mongoPassword = await inquirer.askForMongoPassword();
    const uri = mongodbApiKeys.getUri(mongoPassword.password);
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client;
  },
  connectToMongo: async client => {
    client.connect(err => {
      const collection = client
        .db("GithubAccess")
        .collection("visualisationdata");
      // perform actions on the collection object
      collection.find().toArray((err, items) => {
        console.log("current database contents");
        console.log(items);
      });
    });
  },
  insertInMongo: async (client, data) => {
    client.connect(err => {
      client
        .db("GithubAccess")
        .collection("visualisationdata")
        .insertOne(data);
    });
  }
};
