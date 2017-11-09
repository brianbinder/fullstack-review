import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <span className="repoOwner">{props.repo.owner}</span><a className="repoLink" href={props.repo.url}>{props.repo.name}</a><span className="repoForks">{props.repo.forks}</span>
  </div>
)

export default RepoListEntry;