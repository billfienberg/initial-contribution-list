import React from "react"

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
        <button type="submit" disabled={isDisabled}>
          Fetch Contributions
        </button>
      </div>
    </form>
  )
}

export default Form
