import styled from 'styled-components/macro'

export default function TagSeparator() {
  return (
    <StyledDiv>
      <StyledHr></StyledHr>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border-style: dashed;
  padding: 10px 30px 10px 30px;
`
const StyledHr = styled.div`
  border-bottom: 1px solid #e3e3e3;
  border-style: dashed;
`
