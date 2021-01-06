import styled from 'styled-components/macro'

export default function Button({ onClick, buttonText }) {
  const bgColor = 'var(--color-primary)'

  return (
    <StyledButton bgColor={bgColor} onClick={onClick}>
      {buttonText}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor};
  font-weight: 400;
  color: white;
  min-width: 100px;
  padding: 8px 20px 8px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    margin-left: 10px;
  }
`
