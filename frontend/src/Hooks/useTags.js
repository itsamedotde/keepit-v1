import { useState } from 'react'
import { firstToUpper } from '../Lib/string'
import { apiGetVisionLabels, apiSaveKeepit } from '../Services/apiRequests.js'

export default function useTags() {
  const [tags, setTags] = useState([])
  const addedTags = tags.filter((tag) => tag.added === true).sort()
  const newTags = tags.filter((tag) => tag.added === false).sort()
  const [imageIds, setImageIds] = useState([])

  return {
    tags,
    setTags,
    addedTags,
    newTags,
    handleSubmitTag,
    updateTag,
    loadApiTags,
    handleApiTags,
    imageIds,
  }

  function loadApiTags(images) {
    const files = images
    const labelRequest = {
      email: 'user@email',
      password: 'test',
      files,
    }
    apiGetVisionLabels(labelRequest)
      .then((result) => handleApiTags(result))
      .catch((error) => console.log('error', error))
  }

  function handleApiTags(response) {
    var d = new Date()
    var n = d.getMilliseconds()
    console.log('get response:', n)
    const uniqueApiTags = [...new Set(response.labels)]
    const expandedTags = uniqueApiTags.map((value, index) => {
      return { value: value, added: false, isCustom: false }
    })
    setTags(expandedTags)
    setImageIds(response.ids)
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

  function updateTag(tagValue, newAddedState, isCustom) {
    var searchedIndex = tags.findIndex((tag) => tag.value === tagValue)
    var newTags = tags
    setTags([
      ...newTags.slice(0, searchedIndex),
      { value: tagValue, added: newAddedState, isCustom: isCustom },
      ...newTags.slice(searchedIndex + 1),
    ])
  }
}
