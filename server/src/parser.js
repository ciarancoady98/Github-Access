// module.exports = {
//   //rawRepos is of the format [{full_name: 'ciarancoady98/The-Turing-Game', name: 'The-Turing-Game}]
//   parseRepos: rawRepos => {
//     if (rawRepos != null) {
//       let listOfRepoNames = [];
//       for (let i = 0; i < rawRepos.length; i++) {
//         let repo = rawRepos[i];
//         listOfRepoNames.push(repo.name);
//         //console.log(repo.full_name);
//       }
//       return listOfRepoNames;
//     } else {
//       throw "Cannot parse an empty json";
//     }
//   },
//   //some possible tweaks to work better with a higher number of commit messages
//   parseRepoCommits: (rawUserData, username) => {
//     if (rawUserData != null && rawUserData.repoCommits != null) {
//       let currentBatchId = 0;
//       let currentBatch = [];
//       let documents = [];
//       for (let i = 0; i < rawUserData.repoCommits.length; i++) {
//         try{

//           let author = repoCommits[i].author;
//             let message = repoCommits[i].message;
//             if(author == username && message != null){
//               let commit = 
//             }
//         }
//         catch (error){
//           console.log(error);
//         }
//       }
//       let commitMessages = [];
//       let idNumber = 0;
//       for (let i = 0; i < rawCommits.length; i++) {
//         let commit = rawCommits[i];
//         if (commit != null) {
//           try {
//             let author = commit.author.login;
//             let message = commit.commit.message;
//             idNumber >= 100
//               ? console.log(
//                   "We have hit the 100 commit limit for sentiment analysis"
//                 )
//               : console.log("Within the commit limit");
//             if (author == username && message != null && idNumber <= 100) {
//               messageObject = {
//                 language: "en",
//                 id: "" + idNumber,
//                 text: message
//               };
//               commitMessages.push(messageObject);
//               idNumber += 1;
//             }
//           } catch (e) {
//             console.log(e);
//           }
//         }
//       }
//       return commitMessages;
//     } else {
//       throw "Cannot parse an empty json";
//     }
//   }
// };
