import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as SearchSvg } from '../Assets/search.svg'
import { useHistory, useLocation } from 'react-router-dom'

export default function SearchButton({ onClick, buttonText }) {
  SearchButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  }
  const history = useHistory()

  return <SearchSvg onClick={() => history.goBack()}></SearchSvg>
}

/*
import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../Assets/keepit-button.svg'
import styled from 'styled-components/macro'

export default function UploadButtonFooter() {
  const history = useHistory()

*/
