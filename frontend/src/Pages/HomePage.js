import { useEffect, useState } from 'react'

import UploadButton from '../Components/UploadButton'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])

  useEffect(() => {
    const url = 'http://keepit-be.local/keepit/getall'
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ email: 'user354@email', password: 'test' }),
      redirect: 'follow',
    }
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => handleResponse(result))
      .catch((error) => console.log('error', error))
  }, [])

  function handleResponse(result) {
    setKeepits(result)
    Object.keys(keepits).map((item, i) => console.log(result[item].images))
    //console.log(keepits)
  }

  return (
    <div>
      <h1>Page: Home</h1>

      <UploadButton></UploadButton>
    </div>
  )
}

/*

   {keepits.map((keepit) => (
        <div>{keepit.images[0]}</div>
      ))}
*/
