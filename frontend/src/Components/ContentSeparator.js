import styled from 'styled-components/macro'

export default function TagSeparator() {
  return (
    <StyledDiv>
      <StyledLine></StyledLine>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border-style: dashed;
  padding: 10px 30px 10px 30px;
`
const StyledLine = styled.div`
  border-bottom: 1px solid #e3e3e3;
  border-style: dashed;
`
