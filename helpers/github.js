const request = require('request');
const config = require('../config.js');

let getReposByUsername = (query, cb) => {

  var url = 'https://api.github.com/users/' + query + '/repos';
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(error, response, body) {
    cb(body);
  });

}

var retrieve25HighestForkedRepos = (repos, cb) => {
  var sortFunc = (a, b) => {
    if (a.forks < b.forks) {
      return 1;
    }
    if (a.forks > b.forks) {
      return -1;
    }
    return 0;
  }
  repos.sort(sortFunc);
  cb(repos.slice(0, 24));
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.retrieve25HighestForkedRepos = retrieve25HighestForkedRepos;