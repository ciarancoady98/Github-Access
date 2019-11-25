const fs = require("fs");

module.exports = {
  writeToFile: async stringToSave => {
    return new Promise(resolve => {
      fs.writeFile(
        "D:/Ciaran/Github-Access/server/test.txt",
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
