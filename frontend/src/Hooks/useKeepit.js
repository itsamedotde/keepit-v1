import { useState } from 'react'
import {
  apiDeleteKeepit,
  apiSaveKeepit,
  apiGetAllKeepits,
} from '../Services/apiRequests.js'

export default function useKeepit() {
  const [keepits, setKeepits] = useState([])
  const [rawKeepits, setRawKeepits] = useState([])

  return {
    rawKeepits,
    keepits,
    setKeepits,
    deleteKeepit,
    saveKeepit,
    loadKeepitsFromApi,
  }

  function deleteKeepit(id) {
    apiDeleteKeepit(id)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function saveKeepit(request, handleApiTags) {
    apiSaveKeepit(request)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function loadKeepitsFromApi() {
    apiGetAllKeepits()
      .then((result) => handleApiKeepits(result))
      .catch((error) => console.log('error', error))
  }

  function handleApiKeepits(result) {
    setKeepits(
      result.sort(function (a, b) {
        return b.id - a.id
      })
    )
    setRawKeepits(
      result.sort(function (a, b) {
        return b.id - a.id
      })
    )
  }
}
