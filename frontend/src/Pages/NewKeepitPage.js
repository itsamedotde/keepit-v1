import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UploadButton from '../Components/UploadButton'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState()
  const [showUploadButton, setShowUploadButton] = useState(false)

  useEffect(() => {
    if (images && images.length > 0) {
      setShowUploadButton(false)
    } else {
      setShowUploadButton(true)
    }
  }, [images])

  useEffect(() => {
    const historyImages = history.location.state.images
    if (!images && historyImages) {
      setImages(historyImages)
      history.replace('/new', { images: '' })
    }
  }, [])

  function uploadToBe() {}

  function remove(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
  }

  return (
    <div>
      New keepit!<br></br>
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image['data_url']} alt="" width="100" />
            <div>
              <button onClick={() => remove(index)}>Remove</button>
            </div>
          </div>
        ))}
      {showUploadButton ? <UploadButton></UploadButton> : ''}
      {!showUploadButton ? (
        <button onClick={uploadToBe}>Save Keepit</button>
      ) : (
        ''
      )}
    </div>
  )
}
