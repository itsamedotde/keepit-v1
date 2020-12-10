import { useEffect, useState } from 'react'
import UploadButton from '../Components/UploadButton'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Tag from '../Components/Tag'
import TagSeparator from '../Components/TagSeparator'
import StyledDivider from '../Components/Divider'
import StyledDivider2 from '../Components/Divider2'

import styled from 'styled-components/macro'
import Divider from '../Components/Divider'

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

  const TagFilter = () => {
    return (
      <>
        <div>
          <Divider />
          {tags.map((tag, index) => (
            <Tag
              onClick={() => startFilter(tag.value)}
              targetState={true}
              tagValue={tag.value}
              key={tag.index}
            />
          ))}
          <RestetButton />
        </div>
      </>
    )
  }

  function RestetButton() {
    return <button onClick={resetFilter}>Reset Filter</button>
  }

  return (
    <>
      <StyledMain>
        <StyledKeepitList>
          {keepits.map((keepit, index) => (
            <img
              src={'http://keepit-be.local/' + keepit.images[0]}
              alt=""
              height="50"
              key={keepit.images[0]}
            ></img>
          ))}
        </StyledKeepitList>
        <StyledFilterList>
          <StyledInput placeholder="Search..."></StyledInput>
          <TagFilter />
          <StyledTest></StyledTest>
        </StyledFilterList>
      </StyledMain>
      <Footer
        subFooterContent=""
        actionButtonText="New Keepit"
        actionButton={<UploadButtonFooter />}
        left={<BackButton height="30px" width="30px" />}
        right={<SearchButton />}
      ></Footer>
    </>
  )
}
const StyledTest = styled.div`
  width: 100%;
`

const StyledKeepitList = styled.div`
  text-align: center;
  overflow: scroll;
  max-height: 40vh;
  padding-bottom: 10px;
`
const StyledMain = styled.main``
const StyledFilterList = styled.div`
  bottom: 0px;
  position: fixed;
  padding-bottom: 140px;
  width: 100%;
  padding-right: 60px;
  overflow: scroll;
  height: 40vh;
`

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;

  margin-top: 15px;
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
