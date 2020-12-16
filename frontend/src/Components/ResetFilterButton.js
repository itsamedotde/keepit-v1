import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as FilterCloseIcon } from '../Assets/close.svg'

export default function ResetFilterButton({ onClick, buttonText, className }) {
  return (
    <StyledResetFilterButton className={className} onClick={onClick}>
      {buttonText} <FilterCloseIcon />
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

  svg {
    margin-bottom: -2px;
  }
`

/*


*/
