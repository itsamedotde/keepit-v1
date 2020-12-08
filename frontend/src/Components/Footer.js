import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as Bgfoot } from '../Assets/bg-foot3.svg'
import { renderToStaticMarkup } from 'react-dom/server'

export default function Header(props) {
  const svgString = encodeURIComponent(renderToStaticMarkup(<Bgfoot />))

  return (
    <StyledFooter>
      <StyledActionArea></StyledActionArea>
      <StyledLayoutWrapper>
        <StyledLeft onClick={() => console.log('goo')}></StyledLeft>
        <StyledMiddle
          style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}
        >
          <StyledText>NEW KEEPIT</StyledText>
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledLayoutWrapper>
      <StyledButtonArea>
        <StyledLeftIconWrapper>{props.left}</StyledLeftIconWrapper>
        <StyledIcon>{props.action}</StyledIcon>
        <StyledRightIconWrapper>{props.right}</StyledRightIconWrapper>
      </StyledButtonArea>
    </StyledFooter>
  )
}

const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 60px;
`

const StyledLeftIconWrapper = styled.div`
  width: 25px;
`
const StyledRightIconWrapper = styled.div`
  width: 25px;
`

const StyledIcon = styled.div``

const StyledActionArea = styled.div`
  background-color: white;
  height: 150px;
`

const StyledFooter = styled.footer`
  background-color: #f4f4f4;
  position: fixed;
  bottom: 0px;
  width: 100%;

  &:before {
    position: absolute;
    top: -18px;
    content: 'x';
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 40%,
      rgba(255, 255, 255, 0.5) 80%
    );
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`
const StyledLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledLeft = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 50px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.13);

  text-align: center;
  height: 31px;
  z-index: -1;
`
const StyledMiddle = styled.div`
  min-width: 140px;
  background-position: top;
  background-repeat: no-repeat;
  margin-top: -2px;
  text-align: center;
`
const StyledRight = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 50px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
  text-align: center;
  height: 31px;
  z-index: -1;
`

const StyledGradient = styled.div``

const StyledText = styled.div`
  margin-top: 13px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgb(80, 80, 80);
`
