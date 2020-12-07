import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'

export default function Header(props) {
  return (
    <StyledFooter>
      <StyledGradient></StyledGradient>

      <StyledLayoutWrapper class="ff">
        <StyledLeft>
          <StyledLeftWrapper>{props.left}</StyledLeftWrapper>
        </StyledLeft>

        <StyledMiddle>
          <StyledText>New Keepit</StyledText>
          <StyledIcon>{props.action}</StyledIcon>
        </StyledMiddle>
        <StyledRight>
          {' '}
          <StyledRightWrapper>{props.right}</StyledRightWrapper>
        </StyledRight>
      </StyledLayoutWrapper>
    </StyledFooter>
  )
}
const StyledLeftWrapper = styled.div`
  margin-top: 44px;

  text-align: center;
`
const StyledRightWrapper = styled.div`
  margin-top: 44px;

  text-align: center;
`
const StyledIcon = styled.div`
  height: 60px;

  margin: auto;
  margin-top: 6px;
`

const StyledSpacer = styled.div`
  height: 20px;
  background-color: white;
`

const StyledLayoutWrapper = styled.div`
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`

const StyledText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgb(80, 80, 80);
`

const StyledLeft = styled.div`
  align-self: flex-start;
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 50px;
  box-shadow: -5px 5px 5px 0px rgba(0, 0, 0, 0.13);
`
const StyledMiddle = styled.div`
  background-color: #f4f4f4;
  min-width: 130px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  box-shadow: inset 0px 5px 4px 0px rgba(0, 0, 0, 0.13);
  height: 27px;
  text-align: center;
`
const StyledRight = styled.div`
  align-self: flex-end;
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 50px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.13);
`

const StyledFooter = styled.footer`
  background-color: #f4f4f4;
  height: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;

  &:before {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    content: '';
    background-color: white;
  }
`
const StyledGradient = styled.div`
  width: 100%;
  position: fixed;
  bottom: 80px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 1) 80%
  );
  height: 30px;
`
