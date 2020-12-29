import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { LogoutIcon } from '../Icons'
import { useHistory, useLocation } from 'react-router-dom'

export default function LogoutButton({ onClick }) {
  const history = useHistory()

  return <LogoutIcon onClick={onClick}></LogoutIcon>
}
