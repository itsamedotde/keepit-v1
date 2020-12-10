import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Logo } from '../Assets/logo.svg'

export default function Divider({ onClick, buttonText }) {
  return <StyledDivider></StyledDivider>
}

const StyledDivider = styled.header`
  padding-top: 10px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 5%;
    right: 5%;
    width: 90%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      transparent,
      #e3e3e3,
      transparent
    );
  }
`
