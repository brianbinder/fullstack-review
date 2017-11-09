const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  repos.forEach(function(repo) {
    var newRepo = new Repo({
      id: repo.id,
      owner: repo.owner.login,
      name: repo.name,
      url: repo.html_url,
      forks: repo.forks_count
    });
    newRepo.save(function(err, newRepo) {
      if (err) { throw err; }
      console.log('new repo added to database');
    });
  });
}

module.exports.save = save;