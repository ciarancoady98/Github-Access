const fs = require("fs");

module.exports = {
  writeToFile: async stringToSave => {
    return new Promise(resolve => {
      fs.writeFile(
        "C:/Users/jonco/Github-Access/test.txt",
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
