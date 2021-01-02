import styled from 'styled-components/macro'

export default function ContentSeperator({ className, icon, text }) {
  return (
    <StyledDiv className={className}>
      <span>
        {icon} {text}
      </span>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 20px 0 20px 0;
  text-transform: uppercase;
  max-width: 500px;

  &:before {
    content: '';
    flex: 1;
    border-bottom: 1px dashed #e3e3e3;
    margin-right: 0.25em;
  }

  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px dashed #e3e3e3;
    margin-left: 0.25em;
  }

  span {
    font-weight: 600;
    font-size: 13px;
    color: #c7c7c7;
    padding: 0 5px;
  }

  svg {
    margin-bottom: -1px;
  }
`
