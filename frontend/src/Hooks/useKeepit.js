import { useState } from 'react'
import { apiDeleteKeepit } from '../Services/apiRequests.js'

export default function useKeepit() {
  //const [geolocation, setGeolocation] = useState([])

  return { deleteKeepit }

  function deleteKeepit(id) {
    apiDeleteKeepit(id)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }
}
