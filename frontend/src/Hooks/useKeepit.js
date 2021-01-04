import { useState } from 'react'
import { apiDeleteKeepit, apiSaveKeepit } from '../Services/apiRequests.js'
import { apiGetAllKeepits } from '../Services/apiRequests.js'

export default function useKeepit() {
  //const [geolocation, setGeolocation] = useState([])
  const [keepits, setKeepits] = useState([])

  return { keepits, setKeepits, deleteKeepit, saveKeepit, loadKeepitsFromApi }

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
      .then((result) =>
        setKeepits(
          result.sort(function (a, b) {
            return b.id - a.id
          })
        )
      )
      .catch((error) => console.log('error', error))
  }
}
