import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../Assets/keepit-button.svg'
import styled from 'styled-components/macro'

export default function UploadButtonFooter() {
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
        acceptType={['jpg', 'gif', 'png']}
      >
        {({ onImageUpload }) => (
          <div>
            <StyledIcon>
              <ActionButtonSvg
                onClick={onImageUpload}
                height="50px"
              ></ActionButtonSvg>
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
