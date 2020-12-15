import { useEffect, useState } from 'react'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Tag from '../Components/Tag'
import Header from '../Components/Header'
import Taglist from '../Components/Taglist'
import KeepitList from '../Components/KeepitList'

import ContentSeparator from '../Components/ContentSeparator'

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
    console.log('keepits', keepits)
  }, [keepits])

  function compare(a, b) {
    if (a.value < b.value) {
      return -1
    }
    if (a.value > b.value) {
      return 1
    }
    return 0
  }

  function generateTagList() {
    let collectedTags = []
    keepits.map((keepit) => {
      let tags = keepit.tags
      tags.map((tag) => {
        collectedTags = [
          ...collectedTags,
          { value: tag.value, isCustom: tag.isCustom },
        ]
      })
    })
    collectedTags.sort(compare)
    setTags(unique(collectedTags, 'value'))
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
  // const KeepitList = () => {
  //   return (
  //     <>
  //       <StyledUl>
  //         {keepits.map((keepit, index) => (
  //           <StyledLi>
  //             <StyledImg
  //               src={'http://keepit-be.local/' + keepit.images[0]}
  //               alt=""
  //               key={keepit.images[0]}
  //             ></StyledImg>
  //           </StyledLi>
  //         ))}
  //       </StyledUl>
  //     </>
  //   )
  // }

  function RestetButton() {
    return (
      <StyledResetFilterButton onClick={resetFilter}>
        Reset Filter
      </StyledResetFilterButton>
    )
  }

  function TagReset() {
    if (filter.length > 0) {
      return <RestetButton></RestetButton>
    } else {
      return ''
    }
  }

  return (
    <>
      <StyledLayout>
        <Header />
        <StyledKeepitArea>
          <KeepitList keepits={keepits} />
        </StyledKeepitArea>
        <ContentSeparator></ContentSeparator>
        <StyledFilterArea>
          <StyledInput placeholder="Search..."></StyledInput>
          <Taglist
            tags={tags}
            onClick={startFilter}
            bgColor="var(--color-primary)"
            showIsCustom={false}
          ></Taglist>
          <TagReset></TagReset>
        </StyledFilterArea>
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
const StyledResetFilterButton = styled.button`
  display: inline;
  background-color: #f2a648;
`

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

const StyledKeepitArea = styled.div`
  text-align: center;
  overflow: scroll;
  padding-bottom: 10px;
  padding: 0 30px;
`

const StyledFilterArea = styled.div`
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

     <TagFilter />
*/
