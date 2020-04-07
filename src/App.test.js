import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders the Contributions List app", () => {
  const { getByRole, getByLabelText, queryByText } = render(<App />)

  const usernameInput = getByLabelText(/username/i)
  expect(usernameInput).toBeInTheDocument()
  // TODO: assert that input box is empty

  const fetchContributionsButton = getByRole(/button/i)
  expect(fetchContributionsButton).toBeInTheDocument()
  // TODO: assert that search button is disabled

  const loadingMessage = queryByText(/loading/i)
  expect(loadingMessage).not.toBeInTheDocument()
  // TODO: assert that loading indicator is not present

  const repoTable = queryByText(/loading/i)
  expect(repoTable).not.toBeInTheDocument()
  // TODO: assert that no repos are rendered

  // TODO: input a username
  // TODO: assert that search button is no longer disabled
  // TODO: click search button
  // TODO: assert that loading is present
  // TODO: assert that loading disappears
  // TODO: assert that repos are rendered
})
