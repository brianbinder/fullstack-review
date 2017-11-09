const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.post('/repos', function (req, res) {
  var query = req.body.search;
  // req.on('data', (chunk) => {
  //   query += chunk;
  // })
  // req.on('end', () => {
  helpers.getReposByUsername(query, (results) => {
    db.save(JSON.parse(results), () => {
      res.send('10-4 good buddy.  You searched: ' + query);
    });
  });
  //});
});

app.get('/repos', function (req, res) {
  db.retrieve((repos) => {
    helpers.retrieve25HighestForkedRepos(repos, (sortedRepos) => {
      res.send(JSON.stringify(sortedRepos));
    });
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

