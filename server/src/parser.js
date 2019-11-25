module.exports = {
  parseRepoCommits: (rawCommits, username) => {
    //get all the commits for each repo
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
      let documents = [];
      let currentCharacterCount = 0;
      let formattedMessages = [];
      let idNumber = 0;
      for (let i = 0; i < commits.length; i++) {
        let commit = commits[i];
        if (commit != null) {
          if (commit.messageLength < maxDocumentSize) {
            if (
              currentCharacterCount + commit.messageLength >=
              maxDocumentSize
            ) {
              documents.push(formattedMessages);
              formattedMessages = [];
              currentCharacterCount = 0;
              idNumber = 0;
            }
            try {
              messageObject = {
                language: "en",
                id: "" + idNumber,
                text: commit.message
              };
              formattedMessages.push(messageObject);
              currentCharacterCount += commit.messageLength + 14;
              idNumber += 1;
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      return documents;
    } else {
      throw "Cannot parse an empty json";
    }
  }
};
