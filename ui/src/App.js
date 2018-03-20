import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupForm.js';

class App extends Component {
    registerUser = () => {
        console.log("register");
    }
    
    render() {
    return (
      <div className="App">
          <SignupForm registerUser={this.registerUser} />
      </div>
    );
  }
}

export default App;
