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

module.exports.getReposByUsername = getReposByUsername;