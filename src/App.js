import React from "react"
import gql from "graphql-tag"
import { ApolloConsumer } from "react-apollo"
import Introduction from './Introduction'
import Form from './Form'
import RepoTable from './RepoTable'

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

  componentDidMount() { }

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
        <Introduction />
        <Form onSubmit={this._executeSearch} isDisabled={isDisabled} onChange={onChange} />
        <h2>Repos</h2>
        {loading && <p>Loading...</p>}
        {!!repos.length && <RepoTable repos={repos} />}
      </div>
    )
  }
}

const WithApolloClient = () => <ApolloConsumer>{(client) => <App client={client} />}</ApolloConsumer>

export default WithApolloClient
export { App }
