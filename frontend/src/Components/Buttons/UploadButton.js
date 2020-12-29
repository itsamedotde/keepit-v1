import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'

export default function UploadButton() {
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
            <button onClick={onImageUpload}>Upload Image</button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
