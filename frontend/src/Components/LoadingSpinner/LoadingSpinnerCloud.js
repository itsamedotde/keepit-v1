import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { CloudIcon } from '../Icons'

export default function LoadingSpinner({}) {
  return (
    <StyledLoadingWrapper>
      <CloudIcon fill="var(--color-primary)" width="40"></CloudIcon>
    </StyledLoadingWrapper>
  )
}

const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  svg {
    animation: heartbeat 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(0.75);
    }
    20% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.75);
    }
    60% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.75);
    }
  }
`

const StyledLoadingDiv = styled.div``
