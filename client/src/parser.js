module.exports = {
  parseDatabaseForVisualisation: (rawDatabase, username) => {
    parsedOutput = [];
    nodesArray = [];
    linksArray = [];

    if (rawDatabase != null) {
      //find index of centre user
      let found = false;
      userIndex = 0;
      for (let i = 0; i < rawDatabase.length && !found; i++) {
        //console.log(rawDatabase[i].username + " == " + username);
        if (rawDatabase[i].username == username) {
          found = true;
          userIndex = i;
        }
      }

      //add links from user to followers
      for (let j = 0; j < rawDatabase.length; j++) {
        if (j != userIndex) {
          let link = {
            source: rawDatabase[userIndex].username,
            target: rawDatabase[j].username,
            value: 1
          };
          linksArray.push(link);
        }
      }

      //add all nodes to the graph
      for (let i = 0; i < rawDatabase.length; i++) {
        //add the user node
        node = {
          id: rawDatabase[i].username,
          sentiment: 2
        };
        nodesArray.push(node);
        //add all commits and sentiment data to the graph
        if (
          rawDatabase[i].commits != null &&
          rawDatabase[i].sentiment != null
        ) {
          let maxIndex =
            rawDatabase[i].commits.length <=
            rawDatabase[i].sentiment.documents.length
              ? rawDatabase[i].commits.length
              : rawDatabase[i].sentiment.length;
          for (let j = 0; j < maxIndex; j++) {
            node = {
              id: rawDatabase[i].username + "-" + j,
              sentiment: rawDatabase[i].sentiment.documents[j].score
            };
            nodesArray.push(node);
            let link = {
              source: rawDatabase[i].username,
              target: node.id,
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
