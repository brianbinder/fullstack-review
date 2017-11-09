import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    var context = this;
    $.ajax({
      type: "POST",
      url: '/repos',
      data: {search: term},
      datatype: 'application/json',
      success: function(res) {
        context.requestRepos();
      }
    });
  }

  requestRepos() {
    var context = this;
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: function(res) {
        var repos = JSON.parse(res);
        context.setState({
          repos: repos
        });
      }
    });
  }

  componentDidMount () {
    this.requestRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));