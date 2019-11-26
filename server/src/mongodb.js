const MongoClient = require("mongodb").MongoClient;
const inquirer = require("./inquirer");
const mongodbApiKeys = require("./mongodbApiKeys");

module.exports = {
  buildMongoClient: async () => {
    const mongoPassword = await inquirer.askForMongoPassword();
    const uri = mongodbApiKeys.getUri(mongoPassword.password);
    return new Promise(success => {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      success(client);
    });
  },
  getMongoContents: async client => {
    return new Promise(success => {
      client.connect(err => {
        if (err) throw err;
        const collection = client
          .db("GithubAccess")
          .collection("visualisationdata");
        // perform actions on the collection object
        collection.find().toArray((err, items) => {
          success(items);
        });
      });
    });
  },
  getUserFromMongo: async (client, usernameToFind) => {
    return new Promise(success => {
      client.connect(err => {
        if (err) throw err;
        const collection = client
          .db("GithubAccess")
          .collection("visualisationdata");
        // perform actions on the collection object
        collection.find({ username: usernameToFind }).toArray((err, items) => {
          success(items);
        });
      });
    });
  },
  insertInMongo: async (client, data) => {
    return new Promise(success => {
      client.connect(err => {
        if (err) throw err;
        client
          .db("GithubAccess")
          .collection("visualisationdata")
          .insertOne(data);
        success();
      });
    });
  }
};
