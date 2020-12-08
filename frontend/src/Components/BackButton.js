import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as BackButtonSvg } from '../Assets/back.svg'
import { useHistory, useLocation } from 'react-router-dom'

export default function BackButton({ onClick, buttonText }) {
  BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  }

  function handleOnClick() {
    console.log('back!')
    history.goBack()
  }
  const history = useHistory()

  return <BackButtonSvg onClick={handleOnClick}></BackButtonSvg>
}

/*
import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../Assets/keepit-button.svg'
import styled from 'styled-components/macro'

export default function UploadButtonFooter() {
  const history = useHistory()

*/
