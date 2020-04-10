import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import App from "./App"

test("renders the Contributions List app", async () => {
  const { getByRole, getByLabelText, queryByText, getByTestId, queryByTestId } = render(<App />)

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
