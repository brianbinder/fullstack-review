const express = require('express');
const helpers = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/repos', function (req, res) {
  var query = '';
  req.on('data', (chunk) => {
    query += chunk;
  })
  req.on('end', () => {
    helpers.getReposByUsername(query, (results) => {
      console.log('Github sent this: ', results);
      res.send('10-4 good buddy.  You searched: ' + query);
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

