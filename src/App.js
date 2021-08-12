import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI';
import ListContacts from './ListContacts';
import { render } from '@testing-library/react';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  
  state = {
    contacts: []
  }

  UNSAFE_componentWillMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState => ({
      contacts: currentState.contacts.filter((c) => (c.id !== contact.id))
    })))

    ContactsAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render(){
    return (
      <div className="App">

        <Route exact path="/" render={() => (
          <ListContacts
          contacts={this.state.contacts}
            onContactDel={this.removeContact}
          />
        )} />
        
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App;