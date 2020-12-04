import { useEffect, useState } from 'react'

import UploadButton from '../Components/UploadButton'
import apiGetAllKeepits from '../Services/apiGetAllKeepits'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])
  const [filteredKeepits, setFilteredKeepits] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    loadKeepitsFromApi()
  }, [])

  useEffect(() => {
    console.log('useEffect: filteredKeepits', filteredKeepits)
    setKeepits(filteredKeepits)
  }, [filteredKeepits])

  useEffect(() => {
    console.log('useEffect: keepits', keepits)
  }, [keepits])

  useEffect(() => {
    setFilteredKeepits('')
    filterKeepit()
  }, [filter])

  function loadKeepitsFromApi() {
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
        let result = filter.every((i) => tags.includes(i))
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

  function startFilter() {
    setFilter(['Beer', 'Drink'])
  }

  function resetFilter() {
    loadKeepitsFromApi()
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
      <button onClick={startFilter}>FilterTest</button>
      <button onClick={resetFilter}>Reset Filter</button>
    </div>
  )
}

/*

 


*/
