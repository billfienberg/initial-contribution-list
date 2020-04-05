import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Mounted')
  }

  render() {
    return (
      <div className="App">
        <h1>Class component</h1>
      </div>
    );

  }
}

export default App;
