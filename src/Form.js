import React from "react"
import Button from "react-bootstrap/Button"

function Form(props) {
  const { isDisabled, onChange, onSubmit } = props
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Username:
          <input type="text" name="username" placeholder="billfienberg" onChange={onChange} />
        </label>
      </div>
      <div>
        <Button type="submit" disabled={isDisabled} variant="primary">
          Fetch Contributions
        </Button>
      </div>
    </form>
  )
}

export default Form
