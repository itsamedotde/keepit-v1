import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function OverlayMessage({ status, children, onClick }) {
  console.log(status)
  //const [status2, setStatus2] = useState(status)

  return status ? (
    <StyledOverlay onClick={onClick}>{children}</StyledOverlay>
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
