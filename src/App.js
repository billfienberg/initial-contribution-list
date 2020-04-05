import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log("Mounted")
  }

  render() {
    return (
      <div className="App">
        <input type="text"></input>
      </div>
    )
  }
}

export default App
