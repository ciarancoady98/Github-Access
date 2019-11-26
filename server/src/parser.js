module.exports = {
  parseUserFollowers: rawFollowers => {
    //parse a users followers
    //[{ login: "username1" }, { login: "username2" }];
    let parsedFollowers = [];
    if (rawFollowers != null && rawFollowers.length > 0) {
      for (let i = 0; i < rawFollowers.length; i++) {
        try {
          let username = rawFollowers[i].login;
          if (username != null) parsedFollowers.push(username);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return parsedFollowers;
  },
  parseRepoCommits: (rawCommits, username) => {
    //parse all the commits for each repo
    //[{commit: {message: "de message"}
    //  author: {login: "ciarancoady98"}
    //}]
    let allRepoCommits = [];
    if (rawCommits != null) {
      for (let i = 0; i < rawCommits.length; i++) {
        let currentRepo = rawCommits[i];
        if (currentRepo != null) {
          for (let j = 0; j < currentRepo.length; j++) {
            try {
              let author = currentRepo[j].author.login;
              let messageText = currentRepo[j].commit.message;
              if (author != null && author == username) {
                allRepoCommits.push({
                  message: messageText,
                  messageLength: messageText.length
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
    return allRepoCommits;
  },
  //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
  parseUserRepos: (rawRepos, username) => {
    //get the users repos and save the repo names
    if (rawRepos != null) {
      let listOfRepoNames = [];
      for (let i = 0; i < rawRepos.length; i++) {
        let repo = rawRepos[i];
        listOfRepoNames.push(repo.name);
        //console.log(repo.full_name);
      }
      console.log("Successfully parsed " + username + "'s repos");
      return listOfRepoNames;
    } else {
      throw "Cannot parse an empty json";
    }
  },
  parseCommitsForSentimentAnalysis: commits => {
    if (commits != null) {
      let maxDocumentSize = 5106;
      let currentDocument = [];
      let idNumber = 0;
      //limit the number of commits we are going to analyse to 1000
      let commitsToAnalyse = commits.length < 1000 ? commits.length : 1000;
      for (let i = 0; i < commitsToAnalyse; i++) {
        let commit = commits[i];
        if (commit != null) {
          if (commit.messageLength < maxDocumentSize) {
            try {
              messageObject = {
                language: "en",
                id: "" + idNumber,
                text: commit.message
              };
              currentDocument.push(messageObject);
              idNumber += 1;
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      return currentDocument;
    } else {
      throw "Cannot parse an empty json";
    }
  }
};
