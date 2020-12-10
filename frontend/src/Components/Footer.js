import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Bgfoot } from '../Assets/bg-foot3.svg'
import { renderToStaticMarkup } from 'react-dom/server'

export default function Header(props) {
  const svgString = encodeURIComponent(renderToStaticMarkup(<Bgfoot />))
  const footerBgColoer = 'var(--color-bg)'
  return (
    <StyledFooter bgColor={footerBgColoer}>
      <StyledSubFooter>
        {props.subFooterContent}
        {props.subFooterContentSecond}
      </StyledSubFooter>
      <StyledBgArea>
        <StyleBgLeft />
        <StyledBgMiddle
          style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}
        >
          <StyledText>{props.actionButtonText}</StyledText>
        </StyledBgMiddle>
        <StyleBgRight></StyleBgRight>
      </StyledBgArea>
      <StyledButtonArea>
        <StyledLeftIconWrapper>{props.left}</StyledLeftIconWrapper>
        <StyledIcon>{props.actionButton}</StyledIcon>
        <StyledRightIconWrapper>{props.right}</StyledRightIconWrapper>
      </StyledButtonArea>
    </StyledFooter>
  )
}
const StyledIcon = styled.div``

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
const StyledSubFooter = styled.div`
  background-color: white;
  padding-top: 3px;

  overflow: scroll;
  padding-left: 30px;
  padding-right: 30px;
`
const StyledFooter = styled.footer`
  background-color: ${(props) => props.bgColor};
  position: fixed;
  bottom: 0px;
  width: 100%;

  &:before {
    position: absolute;
    top: -18px;
    content: '_';
    color: white;
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
const StyledBgArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyleBgLeft = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 50px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.13);
  text-align: center;
  height: 31px;
  z-index: -1;
`
const StyledBgMiddle = styled.div`
  min-width: 140px;
  background-position: top;
  background-repeat: no-repeat;
  margin-top: -2px;
  text-align: center;
`
const StyleBgRight = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 50px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
  text-align: center;
  height: 31px;
  z-index: -1;
`
const StyledText = styled.div`
  margin-top: 17px;
  font-size: 12px;
  color: rgb(80, 80, 80);
`
