import { ReactComponent as BackButtonSvg } from '../Assets/back.svg'
import { useHistory, useLocation } from 'react-router-dom'

export default function BackButton({ onClick, buttonText }) {
  function handleOnClick() {
    history.goBack()
  }
  const history = useHistory()
  return <BackButtonSvg onClick={handleOnClick}></BackButtonSvg>
}
