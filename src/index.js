import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

// https://www.howtographql.com/react-apollo/1-getting-started/
import { ApolloProvider } from "react-apollo"
import client from "./client"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
