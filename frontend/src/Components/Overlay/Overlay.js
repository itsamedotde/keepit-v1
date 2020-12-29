import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function OverlayMessage({
  className,
  status,
  children,
  onClick,
}) {
  return status ? (
    <StyledOverlay className={className} onClick={onClick}>
      {children}
    </StyledOverlay>
  ) : (
    ''
  )
}
const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: #000000c7;
  position: absolute;
  z-index: 1000;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  font-size: 35px;
  gap: 10px;
`
