module.exports = {
  //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
  parseFollowers: rawRepos => {
    if (rawRepos != null) {
      let listOfRepoNames = [];
      for (var i = 0; i < rawRepos.length; i++) {
        var repo = rawRepos[i];
        listOfRepoNames.push(repo.full_name);
        //console.log(repo.full_name);
      }
      return listOfRepoNames;
    } else {
      throw "Cannot parse an empty json";
    }
  }
};
