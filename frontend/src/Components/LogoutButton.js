import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as LogoutIcon } from '../Assets/logout.svg'
import { useHistory, useLocation } from 'react-router-dom'

export default function LogoutButton({ onClick }) {
  const history = useHistory()

  return <LogoutIcon onClick={onClick}></LogoutIcon>
}
