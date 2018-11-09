import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ipsum: [] };
  }
  async componentWillMount() {
    const res = await fetch('https://cddpne3ex6.execute-api.eu-west-1.amazonaws.com/dev/')
      .then(res => res.json());
    this.setState({ ipsum: res.result })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Serverless Ipsum<br />
          Random wisdoms from Serverless.com blog
        </header>

        <div className="ipsum">
          {!this.state.ipsum.length && (
            <span>Loading...</span>
          )}
          {this.state.ipsum.map((i, n) => (
            <p key={n}>{i}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
