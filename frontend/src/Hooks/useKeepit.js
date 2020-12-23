import { useState } from 'react'
import { apiDeleteKeepit, apiSaveKeepit } from '../Services/apiRequests.js'

export default function useKeepit() {
  //const [geolocation, setGeolocation] = useState([])

  return { deleteKeepit, saveKeepit }

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
}
