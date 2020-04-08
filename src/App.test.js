import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"
import { ApolloConsumer } from "react-apollo"
import App from "./App"
import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"
import data from "./mockData"

const mocks = [
  {
    request: {
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username: "billfienberg" },
    },
    result: data,
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

  expect(getByLabelText(/username/i).value).toBe("")

  expect(getByTestId(/repo-table/i)).toBeInTheDocument()
})
