const fs = require("fs");

module.exports = {
  writeToFile: async (stringToSave, username) => {
    return new Promise(resolve => {
      fs.writeFile(
        "D:/Ciaran/Github-Access/server/" + username + ".txt",
        stringToSave,
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
          resolve();
        }
      );
    });
  }
};
