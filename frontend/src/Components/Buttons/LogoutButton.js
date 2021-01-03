import { LogoutIcon } from '../Icons'
import { useHistory } from 'react-router-dom'

export default function LogoutButton({ onClick }) {
  return <LogoutIcon onClick={onClick}></LogoutIcon>
}
