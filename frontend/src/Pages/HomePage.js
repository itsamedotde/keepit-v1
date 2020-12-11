import { useEffect, useState } from 'react'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Tag from '../Components/Tag'
import Header from '../Components/Header'

import TagSeparator from '../Components/TagSeparator'

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
    console.log(keepits)
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
      .then((result) =>
        setKeepits(
          result.sort(function (a, b) {
            return b.id - a.id
          })
        )
      )
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
  const KeepitList = () => {
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

  return (
    <>
      <StyledLayout>
        <Header />
        <StyledKeepitList>
          <KeepitList />
        </StyledKeepitList>
        <TagSeparator></TagSeparator>
        <StyledFilterList>
          <StyledInput placeholder="Search..."></StyledInput>
          <TagFilter />
        </StyledFilterList>
        <Footer
          actionButtonText="New Keepit"
          actionButton={<UploadButtonFooter />}
          left={<BackButton height="30px" width="30px" />}
          right={<SearchButton />}
        ></Footer>
      </StyledLayout>
    </>
  )
}

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 5fr 21px 2fr 90px;
  max-width: 600px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
`

const StyledKeepitList = styled.div`
  text-align: center;
  overflow: scroll;
  padding-bottom: 10px;
  padding: 0 30px;
`

const StyledFilterList = styled.div`
  bottom: 0px;
  width: 100%;
  padding-right: 60px;
  overflow: scroll;
  margin-bottom: 20px;
  padding: 0 30px;
`

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;
  margin: 5px 0 10px 0;
  font-size: 14px;
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
