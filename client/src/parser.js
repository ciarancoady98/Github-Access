module.exports = {
  parseDatabaseForVisualisation: rawDatabase => {
    parsedOutput = [];
    nodesArray = [];
    linksArray = [];
    if (rawDatabase != null) {
      for (let i = 0; i < rawDatabase.length; i++) {
        //add the user node
        node = {
          source: rawDatabase[i].username,
          sentiment: 2
        };
        nodesArray.push(node);
        if (
          rawDatabase[i].commits != null &&
          rawDatabase[i].sentiment != null
        ) {
          console.log("not null commits or sentiment");
          let maxIndex =
            rawDatabase[i].commits.length <=
            rawDatabase[i].sentiment.documents.length
              ? rawDatabase[i].commits.length
              : rawDatabase[i].sentiment.length;
          for (let j = 0; j < maxIndex; j++) {
            node = {
              source: rawDatabase[i].username + "-" + j,
              sentiment: rawDatabase[i].sentiment.documents[j].score
            };
            nodesArray.push(node);
            let link = {
              source: rawDatabase[i].username,
              target: node.source,
              value: 1
            };
            linksArray.push(link);
          }
        }
      }
      parsedOutput = {
        nodes: nodesArray,
        links: linksArray
      };
    }
    return parsedOutput;
  }
};
