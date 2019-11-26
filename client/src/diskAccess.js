const fs = require("fs");

module.exports = {
  writeToFile: async (stringToSave, filename) => {
    return new Promise(resolve => {
      fs.writeFile(
        "D:/Ciaran/Github-Access/client/" + filename + ".json",
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
