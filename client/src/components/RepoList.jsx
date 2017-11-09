import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
  <span className="repoOwner title">Owner</span><span className="repoLink title">Repo</span><span className="repoForks title">Forks</span>
    {props.repos.map((repo, index) => {
      return <RepoListEntry key={index} repo={repo}></RepoListEntry>
    })}
  </div>
)

export default RepoList;