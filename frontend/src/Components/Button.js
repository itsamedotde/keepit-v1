import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function Button({ onClick, buttonText }) {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  }
  return <button onClick={onClick}>{buttonText}</button>
}
