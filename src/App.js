import React, { useState } from "react"
import Introduction from "./Introduction"
import Form from "./Form"
import RepoTable from "./RepoTable"
import api from "./api"

function App(props) {
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const isDisabled = !username || isLoading

  const handleUsernameChange = (e) => setUsername(e.target.value)

  async function executeSearch(event) {
    event.preventDefault()
    setIsLoading(true)
    const response = await api(username)
    const result = await response.json()
    const { nodes } = result.data.user.repositoriesContributedTo
    setRepos(nodes)
    setIsLoading(false)
    setUsername("")
  }

  return (
    <div className="App">
      <Introduction />
      <Form onSubmit={executeSearch} isDisabled={isDisabled} onChange={handleUsernameChange} username={username} />
      <h2>Repos</h2>
      {isLoading && <p>Loading...</p>}
      {!!repos.length && <RepoTable repos={repos} />}
    </div>
  )
}

export default App
