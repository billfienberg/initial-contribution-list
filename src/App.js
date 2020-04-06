import React from "react"
import gql from "graphql-tag"

// https://developer.github.com/v4/explorer/
const REPOSITORIES_CONTRIBUTED_TO_QUERY = gql`
  query RepositoriesContributedTo($username: String!) {
    user(login: $username) {
      repositoriesContributedTo(first: 50, privacy: PUBLIC) {
        totalCount
        nodes {
          id
          owner {
            id
            login
          }
          name
          description
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      repos: [],
    }
  }

  componentDidMount() {}

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  // https://www.howtographql.com/react-apollo/7-filtering-searching-the-list-of-links/
  _executeSearch = async (event) => {
    event.preventDefault()
    const { props = {}, state } = this
    const { username } = state
    const { client = {} } = props
    const result = await client.query({
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    })
    const { repositoriesContributedTo } = result.data.user
    const { nodes } = repositoriesContributedTo
    this.setState({ repos: nodes })
  }

  render() {
    const { onChange, state } = this
    const { username, repos = [] } = state
    const isUsernameInputEmpty = !username
    return (
      <div className="App">
        <h1>Contribution List</h1>
        <p>1. Type a GitHub username into the text input (for example, kentcdodds).</p>
        <p>
          2. Click the <b>Fetch Contributions</b> button.
        </p>
        <p>3. See a list of all the repos that user has contributed to.</p>

        <form onSubmit={this._executeSearch}>
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

        {repos.map((x) => {
          return <div>{x.id}</div>
        })}
      </div>
    )
  }
}

export default App
