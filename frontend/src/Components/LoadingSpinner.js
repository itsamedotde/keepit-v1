import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function LoadingSpinner({}) {
  return (
    <StyledLoadingWrapper>
      <StyledLoadingDiv class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoadingDiv>
    </StyledLoadingWrapper>
  )
}

const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledLoadingDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 45px;
  height: 45px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 8px;
    border: 3px solid var(--color-primary);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--color-primary) transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
