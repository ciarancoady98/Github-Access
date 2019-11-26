const MongoClient = require("mongodb").MongoClient;
const inquirer = require("./inquirer");
const mongodbApiKeys = require("./mongodbApiKeys");

let globalUri = null;

module.exports = {
  setupMongoClientDetails: async () => {
    const mongoPassword = await inquirer.askForMongoPassword();
    globalUri = mongodbApiKeys.getUri(mongoPassword.password);
    return new Promise(success => {
      success();
    });
  },
  getMongoContents: async () => {
    return new Promise(success => {
      MongoClient.connect(
        globalUri,
        { useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
          const collection = client
            .db("GithubAccess")
            .collection("visualisationdata");
          // perform actions on the collection object
          collection.find().toArray((err, items) => {
            collection;
            client.close();
            success(items);
          });
        }
      );
    });
  },
  getUserFromMongo: async usernameToFind => {
    return new Promise(success => {
      MongoClient.connect(
        globalUri,
        { useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
          const collection = client
            .db("GithubAccess")
            .collection("visualisationdata");
          // perform actions on the collection object
          collection
            .find({ username: usernameToFind })
            .toArray((err, items) => {
              client.close();
              success(items);
            });
        }
      );
    });
  },
  insertInMongo: async data => {
    return new Promise(success => {
      MongoClient.connect(
        globalUri,
        { useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
          client
            .db("GithubAccess")
            .collection("visualisationdata")
            .insertOne(data);
          client.close();
          success();
        }
      );
    });
  }
};
