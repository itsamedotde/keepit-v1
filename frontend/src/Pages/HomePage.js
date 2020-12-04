import { useEffect, useState } from 'react'

import UploadButton from '../Components/UploadButton'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])
  const [filteredIeepits, setFilteredIeepits] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    loadKeepits()
  }, [])

  useEffect(() => {
    // need to get the recently saved keepit??? why????
    loadKeepits()
  }, [keepits])

  function loadKeepits() {
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
  }

  function handleResponse(result) {
    setKeepits(result)

    // if (filter) {
    //   Object.keys(keepits).map((item, i) => {
    //     if(filter)
    //     console.log('1', keepits[item].images)
    //   })
    // }

    // Object.keys(keepits).map((item, i) =>
    //   console.log('1', keepits[item].images)
    // )
    //console.log(keepits)
  }

  return (
    <div>
      <h1>Page: Home</h1>
      {Object.keys(keepits).map((item, i) => (
        <img
          width="50"
          height="50"
          alt=""
          key={keepits[item].images[0]}
          src={'http://keepit-be.local/' + keepits[item].images[0]}
        ></img>
      ))}
      <UploadButton></UploadButton>
    </div>
  )
}

/*
      {Object.keys(keepits).map((item, i) => console.log('1', result[item].images))}

   {keepits.map((keepit) => (
        <div>{keepit.images[0]}</div>
      ))}

           <img
          width="50"
          height="50"
          key={keepits[item].images}
          src={'http://keepit-be.local/' + keepits[item].images}
        ></img>
*/
