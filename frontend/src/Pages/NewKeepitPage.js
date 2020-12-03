import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiGetVisionLabels from '../Services/apiGetVisionLabels'
import apiSaveKeepit from '../Services/apiSaveKeepit'
import { firstToUpper } from '../Lib/helperFunctions'
import Taglist from '../Components/Taglist'
import CustomTagForm from '../Components/CustomTagForm'
import UploadButton from '../Components/UploadButton'
import Button from '../Components/Button'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [imageIds, setImageIds] = useState([])
  const [tags, setTags] = useState([])
  const addedTags = tags.filter((tag) => tag.added === true).sort()
  const newTags = tags.filter((tag) => tag.added === false).sort()

  useEffect(() => {
    const historyImages = history.location.state.images
    if (historyImages) {
      setImages(historyImages)
      history.replace('/new', { images: '' })
      const files = historyImages
      const request = {
        email: 'user354@email',
        password: 'test',
        files,
      }
      apiGetVisionLabels(request)
        .then((result) => handleApiTags(result))
        .catch((error) => console.log('error', error))
    }
  }, [])

  return (
    <div>
      <h1>Page: New</h1>
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image['data_url']} alt="" width="40" />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
      Added:
      <Taglist
        onClick={updateTag}
        tags={addedTags}
        targetState={false}
      ></Taglist>
      <hr></hr>
      New:
      <Taglist onClick={updateTag} tags={newTags} targetState={true}></Taglist>
      <hr></hr>
      <CustomTagForm onSubmit={handleSubmitTag} />
      <br></br>
      {images.length === 0 ? (
        <UploadButton />
      ) : (
        <Button onClick={saveKeepit} buttonText="Save Keepit" />
      )}
    </div>
  )

  function handleApiTags(response) {
    const uniqueApiTags = [...new Set(response.labels)]
    const expandedTags = uniqueApiTags.map((value, index) => {
      return { value: value, added: false, isCustom: false }
    })
    setTags(expandedTags)
    setImageIds(response.ids)
  }

  function updateTag(tagValue, addedValue) {
    var searchedIndex = tags.findIndex((tag) => tag.value === tagValue)
    const newTags = tags.filter((tag, index) => index !== searchedIndex)
    setTags([
      ...newTags,
      {
        value: tagValue,
        added: addedValue,
        isCustom: tags[searchedIndex].isCustom,
      },
    ])
  }

  function handleSubmitTag(event) {
    event.preventDefault()
    const inputValue = firstToUpper(event.target.customTag.value)
    if (tags.findIndex((tag) => tag.value === inputValue) < 0) {
      setTags([...tags, { value: inputValue, added: true, isCustom: true }])
    }
    event.target.reset()
    event.target.customTag.focus()
  }

  function saveKeepit() {
    const requestTags = addedTags.map((addedTag) => {
      return { value: addedTag.value, isCustom: addedTag.isCustom }
    })

    const request = {
      email: 'user354@email',
      password: 'test',
      requestTags,
      imageIds,
    }

    apiSaveKeepit(request)
      .then((result) => handleApiTags(result))
      .catch((error) => console.log('error', error))
  }

  function removeImage(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
    images.length - 1 === 0 && setTags([])
  }
}
