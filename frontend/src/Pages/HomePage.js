import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import UploadButtonFooter from '../Components/Buttons/UploadButtonFooter'
import SearchButton from '../Components/Buttons/SearchButton'
import ResetFilterButton from '../Components/Buttons/ResetFilterButton'
import LogoutButton from '../Components/Buttons/LogoutButton.js'
import KeepitList from '../Components/KeepitList/KeepitList'
import Taglist from '../Components/Tags/Taglist'
import ContentSeparator from '../Components/Separator/ContentSeparator'
import { FilterIcon, LogoutIcon } from '../Components/Icons'

import useKeepit from '../Hooks/useKeepit'

export default function HomePage() {
  const [filter, setFilter] = useState([])
  const [tags, setTags] = useState([])

  const [showFilter, setShowFilter] = useState([])
  const filterHeight = showFilter ? '20%' : '0%'
  const { keepits, setKeepits, loadKeepitsFromApi } = useKeepit()

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
        <StyledKeepitArea>
          <Header />
          <StyledKeepitList keepits={keepits} />
        </StyledKeepitArea>
        <StyledContentSeparator
          onClick={toggleShowFilter}
          text="FILTER"
          icon={<FilterIcon fill="#c7c7c7" width="10" height="11" />}
        />
        <StyledFilterArea filterHeight={filterHeight}>
          <StyledInput placeholder="Search..."></StyledInput>
          <Taglist
            tags={tags}
            onClick={startFilter}
            bgColor="var(--color-primary)"
            showIsCustom={false}
          ></Taglist>
          <ResetFilterButton onClick={resetFilter} buttonText="Reset" />
        </StyledFilterArea>
        <Footer
          actionButtonText="New Keepit"
          actionButton={<UploadButtonFooter />}
          leftOnClick={logout}
          leftIcon={<LogoutIcon />}
          right={<SearchButton onClick={toggleShowFilter} />}
        ></Footer>{' '}
      </StyledLayout>
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

  // function loadKeepitsFromApi() {
  //   apiGetAllKeepits()
  //     .then((result) =>
  //       setKeepits(
  //         result.sort(function (a, b) {
  //           return b.id - a.id
  //         })
  //       )
  //     )
  //     .catch((error) => console.log('error', error))
  // }

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

const StyledKeepitArea = styled.main`
  overflow: scroll;
  padding: 0 30px;
  margin-top: auto;
  flex-grow: 1;
  height: 100%;
`

const StyledFilterArea = styled.div`
  overflow: scroll;
  width: 100%;
  height: ${(props) => props.filterHeight};
  transition: height 0.25s ease-out;
  padding: 0 30px;
  margin-bottom: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 90px;
`

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 100%;
  top: 0;
  width: 100%;
  font-size: 112.5%;
  background-color: white;
  overflow: hidden;
  position: fixed;
  max-width: 500px;
`

const StyledContentSeparator = styled(ContentSeparator)`
  padding-right: 30px;
  padding-left: 30px;
  height: 40px;
`

const StyledKeepitList = styled(KeepitList)``

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;
  margin: 0px 0 15px 0;
  font-size: 16px;
`
