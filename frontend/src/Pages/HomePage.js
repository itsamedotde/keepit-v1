import { useEffect, useState } from 'react'

import UploadButton from '../Components/UploadButton'
import apiGetAllKeepits from '../Services/apiGetAllKeepits'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])
  let [filteredKeepits, setFilteredKeepits] = useState([])
  let [filter, setFilter] = useState([])

  useEffect(() => {
    loadKeepits()
    console.log('_______________________')
    console.log('On Load:')
    console.log('keepits', keepits)
    console.log('filter', filter)
    console.log('filteredKeepitss', filteredKeepits)
    console.log('_______________________')
  }, [])

  useEffect(() => {
    console.log('useEffect: filteredKeepits', filteredKeepits)
  }, [filteredKeepits])

  useEffect(() => {
    filterKeepit()
  }, [filter])

  function loadKeepits() {
    const requestBody = {
      email: 'user@email',
      password: 'test',
    }
    apiGetAllKeepits(requestBody)
      .then((result) => setKeepits(result))
      .catch((error) => console.log('error', error))
  }

  function filterKeepit() {
    if (filter.length !== 0) {
      console.log('start to filter: ' + filter)
      Object.keys(keepits).map((keepitId) => {
        let tags = keepits[keepitId].tags
        let result = filter.some((i) => tags.includes(i))
        if (result) {
          console.log('result:', result)
          console.log('keepitId:', keepitId)
          setFilteredKeepits((filteredKeepits) => [
            ...filteredKeepits,
            keepits[keepitId],
          ])
        }
      })
    }
  }

  function test() {
    setFilter(['Beer'])
  }

  return (
    <div>
      <h1>Page: Home</h1>
      {Object.keys(keepits).map((item) => (
        <img
          width="50"
          height="50"
          alt=""
          key={keepits[item].images[0]}
          src={'http://keepit-be.local/' + keepits[item].images[0]}
        ></img>
      ))}
      <UploadButton></UploadButton>
      <button onClick={test}>DDDD</button>
    </div>
  )
}

/*

 


*/
