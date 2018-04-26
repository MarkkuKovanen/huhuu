import React, { Component } from 'react';
import Cont from './components/Cont.js';


class App extends Component {
    
    render() {
    return (
      <div className="App">
          <Cont history={this.props.history} />
      </div>
    );
  }
}

export default App;
