module.exports = {
  //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
  parseFollowers: rawRepos => {
    if (rawRepos != null) {
      let listOfRepoNames = [];
      for (let i = 0; i < rawRepos.length; i++) {
        let repo = rawRepos[i];
        listOfRepoNames.push(repo.name);
        //console.log(repo.full_name);
      }
      return listOfRepoNames;
    } else {
      throw "Cannot parse an empty json";
    }
  },
  parseRepoCommits: (rawCommits, username) => {
    if (rawCommits != null) {
      let commitMessages = [];
      for (let i = 0; i < rawCommits.length; i++) {
        let commit = rawCommits[i];
        if (commit != null) {
          try {
            let author = commit.author.login;
            let message = commit.commit.message;
            if (author == username && message != null) {
              commitMessages.push(message);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
      return commitMessages;
    } else {
      throw "Cannot parse an empty json";
    }
  }
};
