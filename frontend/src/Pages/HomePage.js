import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import UploadButtonFooter from '../Components/Buttons/UploadButtonFooter'
import ResetFilterButton from '../Components/Buttons/ResetFilterButton'
import KeepitList from '../Components/KeepitList/KeepitList'
import Taglist from '../Components/Tags/Taglist'
import ContentSeparator from '../Components/Separator/ContentSeparator'
import { FilterIcon, LogoutIcon, SearchIcon } from '../Components/Icons'

import useKeepit from '../Hooks/useKeepit'
import useTagFilter from '../Hooks/useTagFilter'

export default function HomePage() {
  const { keepits, setKeepits, loadKeepitsFromApi } = useKeepit()

  const [showFilter, setShowFilter] = useState([])
  const filterHeight = showFilter ? '20%' : '0%'
  const {
    filter,
    setFilter,
    filterTags,
    generateTagFilter,
    filterKeepits,
  } = useTagFilter()

  useEffect(() => {
    loadKeepitsFromApi()
    setShowFilter(false)
  }, [])

  useEffect(() => {
    if (filter.length > 0) {
      setKeepits(filterKeepits(keepits))
    }
  }, [filter])

  useEffect(() => {
    generateTagFilter(keepits)
  }, [keepits])

  return (
    <>
      <StyledLayout>
        <StyledKeepitArea>
          <Header />
          <KeepitList keepits={keepits} />
        </StyledKeepitArea>
        <StyledContentSeparator
          onClick={() => setShowFilter(!showFilter)}
          text="FILTER"
          icon={<FilterIcon fill="#c7c7c7" width="10" height="11" />}
        />
        <StyledFilterArea filterHeight={filterHeight}>
          <StyledInput placeholder="Search..."></StyledInput>
          <Taglist
            tags={filterTags}
            onClick={handleFilter}
            bgColor="var(--color-primary)"
            showIsCustom={false}
            showIsloading={false}
          ></Taglist>
          <ResetFilterButton onClick={resetFilter} buttonText="Reset" />
        </StyledFilterArea>
        <Footer
          actionButtonText="New Keepit"
          actionButtonIcon={<UploadButtonFooter />}
          leftOnClick={logout}
          leftIcon={<LogoutIcon />}
          rightIcon={<SearchIcon />}
          rightOnClick={() => setShowFilter(!showFilter)}
        ></Footer>{' '}
      </StyledLayout>
    </>
  )

  function logout() {
    console.log('logout...')
  }

  function handleFilter(value) {
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

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #eaeaea;
  padding-left: 15px;
  width: 100%;
  margin: 0px 0 15px 0;
  font-size: 16px;
`
