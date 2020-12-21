import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { apiGetAllKeepits } from '../Services/apiRequests.js'
import Footer from '../Components/Footer'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import SearchButton from '../Components/SearchButton'
import Header from '../Components/Header'
import Taglist from '../Components/Taglist'
import KeepitList from '../Components/KeepitList'
import ResetFilterButton from '../Components/ResetFilterButton'
import ContentSeparator from '../Components/ContentSeparator'
import { ReactComponent as FilterIcon } from '../Assets/filter.svg'
import LogoutButton from '../Components/LogoutButton.js'

export default function HomePage() {
  const [keepits, setKeepits] = useState([])
  const [filter, setFilter] = useState([])
  const [tags, setTags] = useState([])

  const [showFilter, setShowFilter] = useState([])
  const filterHeight = showFilter ? '38%' : '0px'
  useEffect(() => {
    loadKeepitsFromApi()
    setShowFilter(false)
  }, [])

  useEffect(() => {
    filterKeepits()
  }, [filter])

  useEffect(() => {
    generateTagList()
    console.log('keepits', keepits)
  }, [keepits])

  return (
    <>
      <StyledLayout>
        <Header />
        <StyledKeepitList filterHeight={filterHeight} keepits={keepits} />
        <StyledFilterArea filterHeight={filterHeight}>
          <StyledDiv>
            <StyledContentSeparator
              text="FILTER"
              icon={<FilterIcon fill="#c7c7c7" width="10" height="11" />}
            />
          </StyledDiv>
          <StyledInput placeholder="Search..."></StyledInput>
          <Taglist
            tags={tags}
            onClick={startFilter}
            bgColor="var(--color-primary)"
            showIsCustom={false}
          ></Taglist>
          <ResetFilterButton onClick={resetFilter} buttonText="Reset" />
        </StyledFilterArea>
      </StyledLayout>
      <Footer
        actionButtonText="New Keepit"
        actionButton={<UploadButtonFooter />}
        left={<LogoutButton onClick={logout} height="30px" width="30px" />}
        right={<SearchButton onClick={toggleShowFilter} />}
      ></Footer>
    </>
  )

  function logout() {
    console.log('logout...')
  }

  function toggleShowFilter() {
    if (showFilter) {
      setShowFilter(false)
    } else {
      setShowFilter(true)
    }
  }

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
}

const StyledContentSeparator = styled(ContentSeparator)`
  padding-right: 30px;
`
const StyledDiv = styled.div`
  align-self: flex-end;
  position: fixed;
  background: white;
  width: 100%;
  padding-right: 30px;
`
const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 2fr 20px auto 90px;
  max-width: 600px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
`
const StyledKeepitList = styled(KeepitList)`
  text-align: center;
  overflow: scroll;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: ${(props) => props.filterHeight};
  transition: margin-bottom 0.3s ease-out;
`
const StyledFilterArea = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding-right: 60px;
  overflow: scroll;
  margin-bottom: 20px;
  padding: 0 30px;
  height: ${(props) => props.filterHeight};
  transition: height 0.3s ease-out;
  z-index: 100;
  align-self: flex-end;
`
const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;
  margin: 5px 0 10px 0;
  font-size: 14px;
  margin-top: 45px;
`
