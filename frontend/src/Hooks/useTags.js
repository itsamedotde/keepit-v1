import { useState } from 'react'
import { firstToUpper } from '../Lib/string'

export default function useTags() {
  const [tags, setTags] = useState([])
  const addedTags = tags.filter((tag) => tag.added === true).sort()
  const newTags = tags.filter((tag) => tag.added === false).sort()

  return { tags, setTags, addedTags, newTags, handleSubmitTag, updateTag }

  function handleSubmitTag(event) {
    event.preventDefault()
    const inputValue = firstToUpper(event.target.customTag.value)
    if (tags.findIndex((tag) => tag.value === inputValue) < 0) {
      setTags([...tags, { value: inputValue, added: true, isCustom: true }])
    }
    event.target.reset()
    event.target.customTag.focus()
  }

  function updateTag(tagValue, newAddedState) {
    var searchedIndex = tags.findIndex((tag) => tag.value === tagValue)
    const newTags = tags.filter((tag, index) => index !== searchedIndex)
    setTags([
      ...newTags,
      {
        value: tagValue,
        added: newAddedState,
        isCustom: tags[searchedIndex].isCustom,
      },
    ])
  }
}
