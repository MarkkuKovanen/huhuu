import React, { Component } from 'react';
import Container from './components/Container.js';

class App extends Component {
    registerUser = () => {
        console.log("register");
    }
    
    render() {
    return (
      <div className="App">
          <Container />
      </div>
    );
  }
}

export default App;
