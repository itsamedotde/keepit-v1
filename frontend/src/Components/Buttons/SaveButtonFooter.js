import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as SaveFooterButton } from '../../Assets/save-footer-button.svg'

SaveButtonFooter.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function SaveButtonFooter({ onClick }) {
  return (
    <StyledIcon>
      <SaveFooterButton onClick={onClick} height="50px"></SaveFooterButton>
    </StyledIcon>
  )
}

const StyledIcon = styled.div`
  height: 60px;
  margin: auto;
  margin-top: 6px;
`
