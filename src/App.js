import React from "react"
import gql from "graphql-tag"

// https://developer.github.com/v4/explorer/
export const REPOSITORIES_CONTRIBUTED_TO_QUERY = gql`
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
      isLoading: false,
    }
  }

  componentDidMount() {}

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  // https://www.howtographql.com/react-apollo/7-filtering-searching-the-list-of-links/
  _executeSearch = async (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const { props = {}, state } = this
    const { username } = state
    const { client } = props
    const result = await client.query({
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    })
    const { repositoriesContributedTo } = result.data.user
    const { nodes } = repositoriesContributedTo
    this.setState({ repos: nodes, loading: false })
  }

  render() {
    const { onChange, state } = this
    const { loading, repos = [], username } = state
    const isDisabled = !username || loading
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
            <button type="submit" disabled={isDisabled}>
              Fetch Contributions
            </button>
          </div>
        </form>

        <h2>Repos</h2>
        {loading && <p>Loading...</p>}

        {!!repos.length && (
          <table data-testid="repo-table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Name</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((x) => {
                const { id, name, owner, stargazers } = x
                const { login: repoOwner } = owner
                const { totalCount: starCount } = stargazers
                return (
                  <tr key={id}>
                    <td>{repoOwner}</td>
                    <td>{name}</td>
                    <td>{starCount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default App
