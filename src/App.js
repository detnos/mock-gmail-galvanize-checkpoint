import React from 'react';
import logo from './logo.svg';
import './App.css';

class Email extends React.Component {
  render() {
    console.log('currentEmail from Email component:', this.props.email)
    return (
      <div className="email">
        <h1>Email from: {this.props.email.sender}</h1>
        <p>Sent: {this.props.email.date}</p>
        <p>Subject: {this.props.email.subject}</p>
        <p>Message: {this.props.email.message}</p>
        <button key={this.props.id} type="button" onClick={() => this.props.onClick()}>Go back to Mailbox</button>
      </div>
    );
  }
}

/*
date: "2020-08-23T18:25:43.511Z"
id: 1
message: "Mr. and Mrs. Dursley, of number four, Privet Drive, wereproud to say that they were perfectly normal, thankyou very much."
recipient: "jane@galvanize.com"
sender: "katie@galvanize.com"
subject: "Standup meeting"
*/

class EmailSummary extends React.Component {
  render() {
    return (
      <li key={this.props.id} onClick={() => this.props.onClick(this.props.index)}>
        <p key={this.sender} className="email-summary-sender">{this.props.sender}</p>
        <p key={this.subject} className="email-summary-subject">Subject: {this.props.subject}</p>
      </li>
    )
  }
}
class Mailbox extends React.Component { 

  //display each email item with the sender & subject line
  render() {
    return (
      <div className="mailbox">
      {this.props.state.emailsFromServer.map((email, index) => {
        return ( 
          <ul key={email.id}>
            <EmailSummary key={email.id} sender={email.sender} subject={email.subject} id={email.id} index={email.index} onClick={() => this.props.onClick(index)}/> 
          </ul>
          )
      })}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailsFromServer: {},
      fetchingAllEmails: false,
      currentEmail: {},
      viewingCurrentEmail: false,
    }
  }

  handleClick(id) {
    console.log(this.state.emailsFromServer[id])
    this.setState({
      currentEmail: this.state.emailsFromServer[id],
      viewingCurrentEmail: true
    })
    console.log(this.state.currentEmail)
  }

  backToMailboxClick() {
    this.setState({
      currentEmail: {},
      viewingCurrentEmail: false
    })
    console.log(this.state.currentEmail)
  }

  //run the fetch as soon as app loads to access emails faster for the user
  async componentDidMount() {
    const response = await fetch('http://localhost:3001/emails')
    const json = await response.json()
    this.setState({ 
      emailsFromServer: json,
      fetchingAllEmails: true,
    })

    console.log('emailsFromServer in APP: ', this.state.emailsFromServer)
  }

  render() {
    if (this.state.viewingCurrentEmail === true) {
      return (
        <div className="App">
          <header className="App-header">
          </header>
          <main className="main">
            <Email email={this.state.currentEmail} onClick={() => this.backToMailboxClick()}/>
          </main>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
          </header>
          <main className="main">
            {this.state.fetchingAllEmails ?
              <Mailbox 
                state={this.state} 
                onClick={(id) => this.handleClick(id)} 
              /> :
              //this.spinner()
              <img src={logo} className="App-logo" alt="logo" /> 
            }
          </main>
        </div>
      );
    }
  }
}

export default App;
