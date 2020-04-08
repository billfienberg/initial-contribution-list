import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"
import { ApolloConsumer } from "react-apollo"
import App, { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./App"

const mocks = [
  {
    request: {
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username: "billfienberg" },
    },
    result: {
      data: {
        user: {
          repositoriesContributedTo: {
            totalCount: 2,
            nodes: [
              {
                id: "MDEwOlJlcG9zaXRvcnk5MzU2NTU4Mg==",
                owner: { id: "MDEyOk9yZ2FuaXphdGlvbjI5MjM5NDQ3", login: "howtographql" },
                name: "howtographql",
                description: "The Fullstack Tutorial for GraphQL",
                stargazers: { totalCount: 6528 },
              },
              {
                id: "MDEwOlJlcG9zaXRvcnk5NDM2NzY3Nw==",
                owner: { id: "MDQ6VXNlcjQwNjAxODc=", login: "jaredpalmer" },
                name: "formik",
                description: "Build forms in React, without the tears 😭 ",
                stargazers: { totalCount: 21443 },
              },
            ],
          },
        },
      },
    },
  },
]

test("renders the Contributions List app", async () => {
  const { getByRole, getByLabelText, queryByText, getByTestId, queryByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ApolloConsumer>{(client) => <App client={client} />}</ApolloConsumer>
    </MockedProvider>,
  )

  expect(getByLabelText(/username/i).value).toBe("")

  expect(getByRole(/button/i).disabled).toBe(true)

  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  expect(queryByTestId(/repo-table/i)).not.toBeInTheDocument()

  fireEvent.change(getByLabelText(/username/i), { target: { value: "billfienberg" } })

  expect(getByRole(/button/i).disabled).toBe(false)

  fireEvent.click(getByRole(/button/i))

  await waitForElementToBeRemoved(() => queryByText(/loading/i))
  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  expect(getByTestId(/repo-table/i)).toBeInTheDocument()
})
