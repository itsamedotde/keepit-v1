import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { CloseIcon } from '../Icons'
export default function ResetFilterButton({ onClick, buttonText, className }) {
  return (
    <StyledResetFilterButton className={className} onClick={onClick}>
      {buttonText} <CloseIcon />
    </StyledResetFilterButton>
  )
}
const StyledResetFilterButton = styled.button`
  border: none;
  outline: none;
  background-color: #b5b5b5;
  color: white;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  min-width: 50px;
  margin-top: 5px;
  align-items: center;
  padding: 5px 10px 5px 10px;
  border-left: 2px solid #e3e3e3;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 90px;
  svg {
    margin-bottom: -2px;
  }
`
