import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UploadButton from '../Components/UploadButton'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])

  useEffect(() => {
    const historyImages = history.location.state.images
    if (historyImages) {
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
      <h1>Page: New Image</h1>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image['data_url']} alt="" width="100" />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      {images.length === 0 ? (
        <UploadButton />
      ) : (
        <button onClick={uploadToBe}>Save Keepit</button>
      )}
    </div>
  )
}
