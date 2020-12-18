import { useState } from 'react'
import { firstToUpper } from '../Lib/string'

export default function useTags() {
  const [tags, setTags] = useState([])
  const addedTags = tags.filter((tag) => tag.added === true).sort()
  const newTags = tags.filter((tag) => tag.added === false).sort()

  return {
    tags,
    setTags,
    addedTags,
    newTags,
    handleSubmitTag,
    updateTag,
    updateTag2,
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
  function updateTag2(tagValue, newAddedState, isCustom) {
    var searchedIndex = tags.findIndex((tag) => tag.value === tagValue)
    var newTags = tags

    setTags([
      ...newTags.slice(0, searchedIndex),
      { value: tagValue, added: newAddedState, isCustom: isCustom },
      ...newTags.slice(searchedIndex + 1),
    ])

    //newTags.slice(searchedIndex)
    //console.log()

    //const newTags = tags.filter((tag, index) => index !== searchedIndex)

    // newTags.splice(searchedIndex, 1, {
    //   value: tagValue,
    //   added: newAddedState,
    //   isCustom: false,
    // })
    // console.log(tags)
    //setTags(newTags)
    // tags.map((tag) => {
    //   if(tag.value === tagValue)
    //   console.log(tag)
    // })

    // setTags([
    //   ...newTags,
    //   {
    //     value: tagValue,
    //     added: newAddedState,
    //     isCustom: tags[searchedIndex].isCustom,
    //   },
    // ])
  }
}
