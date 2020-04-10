import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import { fetchReposContributedToByUser as mockFetchReposContributedToByUser } from "./api"
import mockData from "./mockData"
import App from "./App"

jest.mock("./api")

test("renders the Contributions List app", async () => {
  mockFetchReposContributedToByUser.mockResolvedValueOnce({ json: () => mockData })
  const { getByRole, getByLabelText, queryByText, getByTestId, queryByTestId } = render(<App />)

  expect(getByLabelText(/username/i).value).toBe("")

  expect(getByRole(/button/i).disabled).toBe(true)

  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  expect(queryByTestId(/repo-table/i)).not.toBeInTheDocument()

  const username = "billfienberg"
  fireEvent.change(getByLabelText(/username/i), { target: { value: username } })

  expect(getByRole(/button/i).disabled).toBe(false)

  expect(mockFetchReposContributedToByUser).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole(/button/i))
  expect(mockFetchReposContributedToByUser).toHaveBeenCalledTimes(1)
  expect(mockFetchReposContributedToByUser).toHaveBeenCalledWith(username)

  await waitForElementToBeRemoved(() => queryByText(/loading/i))
  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  expect(getByLabelText(/username/i).value).toBe("")

  expect(getByTestId(/repo-table/i)).toBeInTheDocument()
})
