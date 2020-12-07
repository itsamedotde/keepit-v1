import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Logo } from '../Assets/logo.svg'

export default function Header({ onClick, buttonText }) {
  return (
    <StyledHeader>
      <Logo></Logo>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`
