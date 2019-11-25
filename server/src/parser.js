const github = require("./git");

module.exports = {
  //some possible tweaks to work better with a higher number of commit messages
  parseRepoCommits: async (githubClient, username, repoList) => {
    //get all the commits for each repo
    //[{commit: {message: "de message"}
    //  author: {login: "ciarancoady98"}
    //}]
    let repoCommits = [];
    for (let i = 0; i < repoList.length; i++) {
      await github
        .getCommits(githubClient, username, repoList[i])
        .then(success => {
          let currentRepo = [];
          for (let j = 0; j < success.length; j++) {
            try {
              let rawCommit = {
                author: success[j].author.login,
                message: success[j].commit.message
              };
              currentRepo.concat(rawCommit);
            } catch (error) {
              console.log(error);
            }
          }
          repoCommits.concat(currentRepo);
        })
        .catch(error => {
          console.log(error);
        });
    }
    return repoCommits;

    // if (rawUserData != null && rawUserData.repoCommits != null) {
    //   let currentBatchId = 0;
    //   let currentBatch = [];
    //   let documents = [];
    //   for (let i = 0; i < rawUserData.repoCommits.length; i++) {
    //     try{

    //       let author = repoCommits[i].author;
    //         let message = repoCommits[i].message;
    //         if(author == username && message != null){
    //           let commit =
    //         }
    //     }
    //     catch (error){
    //       console.log(error);
    //     }
    //   }
    //   let commitMessages = [];
    //   let idNumber = 0;
    //   for (let i = 0; i < rawCommits.length; i++) {
    //     let commit = rawCommits[i];
    //     if (commit != null) {
    //       try {
    //         let author = commit.author.login;
    //         let message = commit.commit.message;
    //         idNumber >= 100
    //           ? console.log(
    //               "We have hit the 100 commit limit for sentiment analysis"
    //             )
    //           : console.log("Within the commit limit");
    //         if (author == username && message != null && idNumber <= 100) {
    //           messageObject = {
    //             language: "en",
    //             id: "" + idNumber,
    //             text: message
    //           };
    //           commitMessages.push(messageObject);
    //           idNumber += 1;
    //         }
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //   }
    //   return commitMessages;
    // } else {
    //   throw "Cannot parse an empty json";
    // }
  },
  //This function will get all the repos and parse them
  //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
  parseUserRepos: async (githubClient, username) => {
    //get the users repos and save the repo names
    let repoNames = [];
    await github
      .getRepos(githubClient, username)
      .then(success => {
        if (success != null) {
          let listOfRepoNames = [];
          for (let i = 0; i < success.length; i++) {
            let repo = success[i];
            listOfRepoNames.concat(repo.name);
            //listOfRepoNames.push(repo.name);
            //console.log(repo.full_name);
            console.log("Successfully parsed " + username + "'s repos");
          }
          repoNames = listOfRepoNames;
        } else {
          throw "Cannot parse an empty json";
        }
      })
      .catch(error => {
        console.log(error);
      });
    return repoNames;
  }
};
