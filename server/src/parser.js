module.exports = {
  //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
  parseFollowers: rawRepos => {
    if (rawRepos != null) {
      let listOfRepoNames = [];
      for (let i = 0; i < rawRepos.length; i++) {
        let repo = rawRepos[i];
        listOfRepoNames.push(repo.full_name);
        //console.log(repo.full_name);
      }
      return listOfRepoNames;
    } else {
      throw "Cannot parse an empty json";
    }
  },
  parseRepoCommits: rawCommits => {
    if (rawCommits != null) {
      for (let i = 0; i < rawCommits.length; i++) {
        let commit = rawCommits[i];
        if (commit != null) {
          try {
            console.log("----------------------------------------");
            console.log("username: " + commit.author.login);
            console.log("commit message: " + commit.commit.message);
            console.log("----------------------------------------");
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else {
      throw "Cannot parse an empty json";
    }
  }
};
