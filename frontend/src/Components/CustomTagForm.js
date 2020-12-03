import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function CustomTagForm({ onSubmit }) {
  CustomTagForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    targetState: PropTypes.bool.isRequired,
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="customTag"
        type="text"
        placeholder="Add your own tag..."
      ></input>
      <button>+</button>
    </form>
  )
}
