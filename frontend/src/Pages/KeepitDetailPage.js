import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import StarRating from '../Components/StarRating'
import Taglist from '../Components/Taglist'
import ContentSeparator from '../Components/ContentSeparator'
import Overlay from '../Components/Overlay'
import useOverlay from '../Hooks/useOverlay'
import useKeepit from '../Hooks/useKeepit'

import { EditIcon, TagIcon, DeleteIcon } from '../Components/Icons'

export default function KeepitDetailPage({ props }) {
  const { deleteKeepit } = useKeepit()
  const {
    overlayStatus,
    setOverlayStatus,
    overlayContent,
    setOverlayContent,
  } = useOverlay()

  const history = useHistory()
  const keepit = history.location.state.keepit
  const tags = keepit.tags

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  const imageUrl = apiBaseUrl + '/' + keepit.images[0]

  function handleDelete() {
    deleteKeepit(keepit.id)
    setOverlayContent(
      <StyledDeleteOverlay>
        DELETED
        <DeleteIcon width="40" fill="var(--color-primary)" />
      </StyledDeleteOverlay>
    )
    setOverlayStatus(true)
    setTimeout(function () {
      history.push('/')
    }, 1500)
  }

  function showDate() {
    if (keepit.date) {
      var date = keepit.date.date.split(' ')
      return date[0]
    } else {
      console.log('ISNULL')
      return 'Long time ago'
    }
  }

  function showLocation() {
    if (keepit.city) {
      return keepit.city + ', ' + keepit.country
    } else {
      return 'In a galaxy far, far away'
    }
  }

  return (
    <>
      <StyledLayout>
        <Header />
        <Overlay status={overlayStatus} onClick={() => setOverlayStatus(false)}>
          {overlayContent}
        </Overlay>
        <StyledImageArea>
          <StyledImage
            onClick={() => {
              setOverlayContent(<StyledOverlayImage src={imageUrl} />)
              setOverlayStatus(true)
            }}
            bgImg={imageUrl}
          />
          <StyledSubInfoArea>
            <StyledDateLocationArea>
              {showDate()}
              <br></br>
              {showLocation()}
            </StyledDateLocationArea>
            <StyledSubMenu>
              <StyedIconWrapperLeft onClick={handleDelete}>
                <DeleteIcon width="14" fill="#666" />
                Delete
              </StyedIconWrapperLeft>
              <StyedIconWrapperRight
                onClick={() => {
                  alert('iscomingsoon')
                }}
              >
                <EditIcon />
                Edit
              </StyedIconWrapperRight>
            </StyledSubMenu>
          </StyledSubInfoArea>
        </StyledImageArea>
        <StyledTagArea>
          <TagIcon />
          <StyledTagHeadline>Tags</StyledTagHeadline>
          <StyledStarRating rating={keepit.rated} />
          <ContentSeparator></ContentSeparator>
          <Taglist
            tags={tags}
            onClick=""
            bgColor="var(--color-primary)"
            showIsCustom={true}
          ></Taglist>
        </StyledTagArea>
      </StyledLayout>
      <Footer
        actionButtonText="New Keepit"
        actionButton={<UploadButtonFooter />}
        left={<BackButton height="30px" width="30px" />}
        right={<SearchButton />}
      ></Footer>
    </>
  )
}

const StyledStarRating = styled(StarRating)`
  float: right;
  padding-right: 5px;
  margin-top: 4px;
`

const StyledDeleteOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const StyledOverlayImage = styled.img`
  width: 100%;
`

const StyledDateLocationArea = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`

const StyedIconWrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #c9c9c9;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 70px;
  margin: 5px 0;
`

const StyedIconWrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 70px;
`

const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
`

const StyledSubInfoArea = styled.div`
  font-size: 15px;
  bottom: 0;
  height: 50px;
  position: absolute;
  width: 100%;
  background-color: #ffffffcf;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledTagArea = styled.div`
  padding: 0 30px;
  margin-top: 10px;
`

const StyledTagHeadline = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: #c7c7c7;
  margin-left: 5px;
  text-transform: uppercase;
`

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 50vh auto 125px;
  max-width: 600px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
  overflow: scroll;
`
const StyledImageArea = styled.div`
  text-align: center;
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px 0;
`

const StyledImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`
