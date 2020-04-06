import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
    }
  }

  componentDidMount() {}

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  // https://reactjs.org/docs/forms.html#controlled-components
  handleSubmit = (event) => {
    alert("A username was submitted: " + this.state.username)
    event.preventDefault()
  }

  render() {
    const { state, onChange } = this
    const { username } = state
    const isUsernameInputEmpty = !username
    return (
      <div className="App">
        <h1>Contribution List</h1>
        <p>1. Type a GitHub username into the text input (for example, kentcdodds).</p>
        <p>
          2. Click the <b>Fetch Contributions</b> button.
        </p>
        <p>3. See a list of all the repos that user has contributed to.</p>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Username:
              <input type="text" name="username" placeholder="billfienberg" onChange={onChange} />
            </label>
          </div>
          <div>
            <button type="submit" disabled={isUsernameInputEmpty}>
              Fetch Contributions
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default App
