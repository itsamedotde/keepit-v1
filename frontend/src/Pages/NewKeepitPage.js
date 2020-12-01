import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UploadButton from '../Components/UploadButton'
import getVisionLabels from '../Services/getVisionLabels'
import styled from 'styled-components/macro'
import { firstToUpper } from '../Lib/helperFunctions'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])

  const [tags, setTags] = useState([])
  const addedTags = tags.filter((tag) => tag.added === true).sort()
  const newTags = tags.filter((tag) => tag.added === false).sort()

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
        .then((result) => handleApiTags(result.labels))
        .catch((error) => console.log('error', error))
  }, [])

  function handleApiTags(apiTags) {
    let uniqueApiTags = [...new Set(apiTags)]
    const expandedTags = uniqueApiTags.map((value, index) => {
      return { value: value, added: false, isCustom: false }
    })
    setTags(expandedTags)
  }

  function uploadToBe() {}

  function remove(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
    images.length - 1 === 0 && setTags([])
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

  function addCustomTag(event) {
    event.preventDefault()
    const inputValue = firstToUpper(event.target.customTag.value)
    if (tags.findIndex((tag) => tag.value === inputValue) < 0) {
      setTags([...tags, { value: inputValue, added: true, isCustom: true }])
    }
    event.target.reset()
    event.target.customTag.focus()
  }

  return (
    <div>
      <h1>Page: New</h1>
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image['data_url']} alt="" width="40" />
            <button onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
      Added:
      {addedTags &&
        addedTags.map((addedTag, index) => (
          <StyledTag
            key={addedTag.value}
            onClick={() => updateTag(addedTag.value, false)}
          >
            {addedTag.value}
          </StyledTag>
        ))}
      <hr></hr>
      New:
      {newTags &&
        newTags.map((newTag, index) => (
          <StyledTag
            key={newTag.value}
            onClick={() => updateTag(newTag.value, true)}
          >
            {newTag.value}
          </StyledTag>
        ))}
      <hr></hr>
      <form onSubmit={addCustomTag}>
        <input
          name="customTag"
          type="text"
          placeholder="Add your own tag..."
        ></input>
        <button>+</button>
      </form>
      <br></br>
      <br></br>
      {images.length === 0 ? (
        <UploadButton />
      ) : (
        <button onClick={uploadToBe}>Save Keepit</button>
      )}
    </div>
  )
}

const StyledTag = styled.span`
  background-color: #e0bd6d;
  padding: 5px;
  margin: 5px;
  display: inline-block;
`
