const fs = require("fs");

module.exports = {
  writeToFile: async (stringToSave, username) => {
    return new Promise(resolve => {
      fs.writeFile(
        __dirname + "/" + username + "-bak.txt",
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
