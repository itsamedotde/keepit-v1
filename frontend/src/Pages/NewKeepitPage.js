import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UploadButton from '../Components/UploadButton'
import getVisionLabels from '../Services/getVisionLabels'
import styled from 'styled-components/macro'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const historyImages = history.location.state.images
    if (historyImages) {
      setImages(historyImages)
      history.replace('/new', { images: '' })
    }

    let files = historyImages
    let request = {
      email: 'user354@email',
      password: 'test',
      files,
    }
    historyImages &&
      getVisionLabels(request)
        .then((result) => setTags(result.labels))
        .catch((error) => console.log('error', error))
  }, [])

  function uploadToBe() {}

  function remove(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
  }

  return (
    <div>
      <h1>Page: New</h1>
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image['data_url']} alt="" width="100" />
            <button onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
      {tags.map((tag, index) => (
        <StyledSpan key={index}>{tag}</StyledSpan>
      ))}
      {images.length === 0 ? (
        <UploadButton />
      ) : (
        <button onClick={uploadToBe}>Save Keepit</button>
      )}
    </div>
  )
}

const StyledSpan = styled.span`
  background-color: #e0bd6d;
  padding: 5px;
  margin: 5px;
  display: inline-block;
`
