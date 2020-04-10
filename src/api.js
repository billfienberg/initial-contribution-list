import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

function api(username) {
  const variables = { username }
  const token = process.env.REACT_APP_ACCESS_TOKEN
  const body = JSON.stringify({
    query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
    variables,
  })

  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
    body,
  })
}

export default api
