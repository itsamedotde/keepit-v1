import styled from 'styled-components/macro'

export default function TagSeparator({ className }) {
  return (
    <StyledDiv className={className}>
      <StyledLine></StyledLine>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border-style: dashed;
  padding: 10px 0 10px 0;
`
const StyledLine = styled.div`
  border-bottom: 1px solid #e3e3e3;
  border-style: dashed;
`
