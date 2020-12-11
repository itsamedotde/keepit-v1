import { useEffect, useState } from 'react'
import UploadButton from '../Components/UploadButton'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Tag from '../Components/Tag'
import TagSeparator from '../Components/TagSeparator'

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
  const ImageList = () => {
    return (
      <>
        <StyledUl>
          {keepits.map((keepit, index) => (
            <StyledLi>
              <StyledImg
                src={'http://keepit-be.local/' + keepit.images[0]}
                alt=""
                key={keepit.images[0]}
              ></StyledImg>
            </StyledLi>
          ))}
        </StyledUl>
      </>
    )
  }

  const StyledImg = styled.img`
    max-height: 100%;
    min-width: 100%;
    object-fit: contain;
    vertical-align: bottom;
    border: 1px dotted #e3e3e3;
    border-radius: 2px;
    padding: 3px;
  `
  const StyledUl = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 3px;
    flex-wrap: wrap;
  `
  const StyledLi = styled.li`
    height: 12vh;
    flex-grow: 1;

    &:last-child {
    }
  `
  function RestetButton() {
    return <button onClick={resetFilter}>Reset Filter</button>
  }

  /*



 <StackGrid
        columnWidth={150}
      >
        <div key="key1">Item 1</div>
        <div key="key2">Item 2</div>
        <div key="key3">Item 3</div>
      </StackGrid>

  */
  return (
    <>
      <StyledMain>
        <StyledKeepitList>
          <ImageList />
        </StyledKeepitList>
        <StyledDiv />
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

const StyledDiv = styled.div`
  border-bottom: 1px solid #e3e3e3;
  border-style: dashed;
  margin: 10px 0 10px 0;
  position: fixed;
  bottom: 1px;
  background-color: red;
`

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
  height: 43vh;
`

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;
  margin: 5px 0 10px 0;
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
