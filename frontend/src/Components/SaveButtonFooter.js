import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../Assets/keepit-button.svg'
import styled from 'styled-components/macro'
import { ReactComponent as SaveFooterButton } from '../Assets/save-footer-button.svg'

export default function SaveButtonFooter({ onClick }) {
  const history = useHistory()
  const maxNumber = 3
  const location = useLocation()

  const onChange = (imageList, addUpdateIndex) => {
    history.push('/new', { images: imageList })
    if (location.pathname === '/new') {
      window.location.reload()
    }
  }

  return (
    <div>
      <ImageUploading
        multiple
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ onImageUpload }) => (
          <div>
            <StyledIcon>
              <SaveFooterButton
                onClick={onClick}
                height="50px"
              ></SaveFooterButton>
            </StyledIcon>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

const StyledIcon = styled.div`
  height: 60px;
  margin: auto;
  margin-top: 6px;
`
