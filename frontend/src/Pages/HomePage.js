import { useEffect, useState } from 'react'

import UploadButton from '../Components/UploadButton'
import apiGetAllKeepits from '../Services/apiGetAllKeepits'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])
  const [filter, setFilter] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    loadKeepitsFromApi()
  }, [])

  useEffect(() => {
    filterKeepits()
  }, [filter])

  useEffect(() => {
    generateTagList()
  }, [keepits])

  function generateTagList() {
    let tagList = []
    keepits.map((keepit) => {
      let tags = keepit.tags
      tags.map((tag) => {
        tagList = [...tagList, { value: tag.value, isCustom: tag.isCustom }]
      })
    })
    setTags(unique(tagList, 'value'))
  }

  function unique(array, propertyName) {
    return array.filter(
      (e, i) =>
        array.findIndex((a) => a[propertyName] === e[propertyName]) === i
    )
  }

  function loadKeepitsFromApi() {
    const requestBody = {
      email: 'user@email',
      password: 'test',
    }
    apiGetAllKeepits(requestBody)
      .then((result) => setKeepits(result))
      .catch((error) => console.log('error', error))
  }

  function filterKeepits() {
    let filteredKeepits = []
    if (filter.length !== 0) {
      keepits.map((keepit) => {
        let tagsValues = keepit.tags.map((tag) => tag.value)
        let tagsFound = filter.every((i) => tagsValues.includes(i))
        if (tagsFound) {
          filteredKeepits = [...filteredKeepits, keepit]
        }
      })
      setKeepits(filteredKeepits)
    }
  }

  function startFilter(value) {
    setFilter([...filter, value])
  }

  function resetFilter() {
    loadKeepitsFromApi()
    setFilter([])
  }

  return (
    <main>
      <h1>Page: Home</h1>
      {keepits.map((keepit, index) => (
        <img
          src={'http://keepit-be.local/' + keepit.images[0]}
          alt=""
          height="50"
          key={keepit.images[0]}
        ></img>
      ))}
      <hr></hr>
      {tags.map((tag) => (
        <span onClick={() => startFilter(tag.value)}>{tag.value} | </span>
      ))}
      {tags.map((tag) => (
        <span onClick={() => startFilter(tag.value)}>{tag.value} | </span>
      ))}
      {tags.map((tag) => (
        <span onClick={() => startFilter(tag.value)}>{tag.value} | </span>
      ))}
      {tags.map((tag) => (
        <span onClick={() => startFilter(tag.value)}>{tag.value} | </span>
      ))}
      <button onClick={resetFilter}>Reset Filter</button>
      <hr></hr>

      <UploadButton></UploadButton>
    </main>
  )
}
