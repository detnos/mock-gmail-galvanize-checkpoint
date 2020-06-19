import React from 'react';
import logo from './logo.svg';
import './App.css';

class Email extends React.Component {
  render() {
    return (
      <div className="email">

      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailsFromServer: {},
      fetchingAllEmails: false,
    }
  }

  //run the fetch as soon as app loads to access emails faster for the user
  async componentDidMount() {
    const response = await fetch('http://localhost:3001/emails')
    const json = await response.json()
    this.setState({ emailsFromServer: json })
    console.log(this.state.emailsFromServer)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main className="main">
          {this.state.fetchingAllEmails ?
            //this.spinner()
            <p>Loading...</p> :
            <p>Emails fetched</p>
          }
        </main>
      </div>
    );
  }
}

export default App;
