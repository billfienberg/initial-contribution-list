import React, { useState } from "react"
import { ApolloConsumer } from "react-apollo"
import Introduction from "./Introduction"
import Form from "./Form"
import RepoTable from "./RepoTable"
import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

function App(props) {
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const isDisabled = !username || isLoading

  function onChange(event) {
    setUsername(event.target.value)
  }

  async function _executeSearch(event) {
    event.preventDefault()
    setIsLoading(true)
    const { client } = props
    const result = await client.query({
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    })
    const { repositoriesContributedTo } = result.data.user
    const { nodes } = repositoriesContributedTo
    setRepos(nodes)
    setIsLoading(false)
    setUsername("")
  }

  return (
    <div className="App">
      <Introduction />
      <Form onSubmit={_executeSearch} isDisabled={isDisabled} onChange={onChange} username={username} />
      <h2>Repos</h2>
      {isLoading && <p>Loading...</p>}
      {!!repos.length && <RepoTable repos={repos} />}
    </div>
  )
}

const WithApolloClient = () => <ApolloConsumer>{(client) => <App client={client} />}</ApolloConsumer>

export default WithApolloClient
export { App }
