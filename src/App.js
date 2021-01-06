import React, {Component} from 'react';
import './App.css';
import AppList from './appList/appList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }
  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //construct a URL with the query string
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null //reset errors
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, cound not get apps at this time'
        });
      })
  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <AppList {...app} key = {i}/>
    })
    return (
      <main className = 'App'>
        <h1>Google Play App List</h1>
        <div className = 'search'>
          <form onSubmit = {e => this.handleSubmit(e)}>
            <label htmlFor = 'search'>Search: </label>
            <input
              type = 'text'
              id = 'search'
              name = 'search'
              value = {this.state.search}
              onChange = {e => this.setSearch(e.target.value)}/>

            <label htmlFor = 'sort'>Sort: </label>
            <select id = 'sort' name = 'sort' onChange = {e => this.setSort(e.target.value)}>
              <option value = "">None</option>
              <option value = 'Rating'>Rating</option>
              <option value = 'App'>App</option>
            </select>
            <button type = 'submit'>Search</button>
          </form>
          <div className = 'App_error'>{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;
