import { useEffect, useState } from 'react'
import UploadButton from '../Components/UploadButton'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Tag from '../Components/Tag'
import Input from '../Components/Input'

import styled from 'styled-components/macro'

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
    apiGetAllKeepits()
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

  function MyTaglist() {
    const test = tags.map((tag) => (
      <Tag
        onClick={() => startFilter(tag.value)}
        targetState={true}
        tagValue={tag.value}
      />
    ))
    return test
  }

  const TagFilter = () => {
    return (
      <>
        {tags.map((tag, index) => (
          <Tag
            onClick={() => startFilter(tag.value)}
            targetState={true}
            tagValue={tag.value}
            key={tag.index}
          />
        ))}
        <RestetButton />
      </>
    )
  }

  function RestetButton() {
    return <button onClick={resetFilter}>Reset Filter</button>
  }

  return (
    <>
      <StyledMain>
        {keepits.map((keepit, index) => (
          <img
            src={'http://keepit-be.local/' + keepit.images[0]}
            alt=""
            height="50"
            key={keepit.images[0]}
          ></img>
        ))}
      </StyledMain>
      <Footer
        subFooterContent={<TagFilter />}
        actionButtonText="New Keepit"
        actionButton={<UploadButtonFooter />}
        left={<BackButton height="30px" width="30px" />}
        right={<SearchButton />}
      ></Footer>
    </>
  )
}

const StyledMain = styled.main`
  padding-bottom: 250px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
`

/*

      {tags.map((tag) => (
          <Tag
            onClick={() => startFilter(tag.value)}
            targetState={true}
            tagValue={tag.value}
          />
        ))}



              <Footer
        subFooterContent={tags.map((tag) => (
          <Tag
            onClick={() => startFilter(tag.value)}
            targetState={true}
            tagValue={tag.value}
          />
        ))}
        actionButtonText="New Keepit"
        actionButton={<UploadButtonFooter />}
        left={<BackButton height="30px" width="30px" />}
        right={<SearchButton />}
      ></Footer>
*/
