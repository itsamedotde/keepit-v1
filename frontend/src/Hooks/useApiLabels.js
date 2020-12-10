import { useEffect, useState } from 'react'
import { apiGetVisionLabels } from '../Services/apiRequests.js'

export default function useApiLabels(historyImages) {
  loadApiLabels()

  if (historyImages) {
    setImages(historyImages)
    history.replace('/new', { images: '' })
    const files = historyImages
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
    console.log(response)
    const uniqueApiTags = [...new Set(response.labels)]
    const expandedTags = uniqueApiTags.map((value, index) => {
      return { value: value, added: false, isCustom: false }
    })
    setTags(expandedTags)
    setImageIds(response.ids)
  }
}
