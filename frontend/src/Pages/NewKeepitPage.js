import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import TaglistNewKeepit from '../Components/Tags/TaglistNewKeepit'
import CustomTagForm from '../Components/Tags/CustomTagForm'
import BackButton from '../Components/Buttons/BackButton'
import SearchButton from '../Components/Buttons/SearchButton'
import SaveButtonFooter from '../Components/Buttons/SaveButtonFooter'
import StarRatingForm from '../Components/StarRating/StarRatingForm'
import Overlay from '../Components/Overlay/Overlay'
import ContentSeparator from '../Components/Separator/ContentSeparator'
import {
  BackIcon,
  StarIcon,
  TagIcon,
  DoneIcon,
  DeleteIcon,
} from '../Components/Icons'

import setBase64 from '../Util/setBase64'

import useTags from '../Hooks/useTags'
import useOverlay from '../Hooks/useOverlay'
import useKeepit from '../Hooks/useKeepit'
import useGeolocation from '../Hooks/useGeolocation'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [rated, setRated] = useState([])

  const { overlayStatus, setOverlayStatus } = useOverlay()

  const {
    tags,
    setTags,
    addedTags,
    handleSubmitTag,
    toggleTagAdded,
    loadApiTags,
    imageIds,
  } = useTags()

  const { geolocation, getBrowserLocation } = useGeolocation()
  const { saveKeepit } = useKeepit()

  useEffect(() => {
    loadHistoryImages()
    getBrowserLocation()
    setOverlayStatus(false)
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      loadApiTags(images)
    }
  }, [images])

  return (
    <>
      <StyledSaveOverlay
        status={overlayStatus}
        onClick={() => setOverlayStatus(false)}
      >
        SAVE
        <DoneIcon width="40" fill="var(--color-primary)" />
      </StyledSaveOverlay>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImageBg bgImg={setBgImg}></StyledImageBg>
          {images &&
            images.map((image, index) => (
              <StyledImageWrapper key={index}>
                <StyledImage src={image} alt="" height="160" />
                <StyledRemoveWrapper>
                  <StyledRemove onClick={() => removeImage(index)}>
                    <DeleteIcon width="11"></DeleteIcon> Delete
                  </StyledRemove>
                </StyledRemoveWrapper>
              </StyledImageWrapper>
            ))}
        </StyledImageArea>
        <StyledOptionArea>
          <ContentSeparator
            text="RATE IT"
            icon={<StarIcon fill="#c7c7c7" width="12" height="12" />}
          />
          <StarRatingForm onClick={rating}></StarRatingForm>
          <ContentSeparator
            text="TAG IT"
            icon={<TagIcon fill="#c7c7c7" width="11" height="11" />}
          />
          <TaglistNewKeepit
            tags={tags}
            onClick={toggleTagAdded}
            bgColor="var(--color-primary)"
            showIsCustom={true}
            showIsloading={true}
          ></TaglistNewKeepit>
          <CustomTagForm onSubmit={handleSubmitTag} />
        </StyledOptionArea>
      </StyledLayout>
      <Footer
        actionButtonText="Save Keepit"
        actionButton={<SaveButtonFooter onClick={handleSaveKeepit} />}
        leftIcon={<BackIcon />}
        leftOnClick={() => history.push('/')}
        right={<SearchButton />}
      ></Footer>
    </>
  )

  async function loadHistoryImages() {
    const newImagesPromises = []
    Array.from(history.location.state.images).forEach((file) => {
      newImagesPromises.push(setBase64(file))
    })
    setImages(await Promise.all(newImagesPromises))
  }

  function rating(rating) {
    setRated(rating)
  }

  function setBgImg() {
    if (images.length > 0) {
      return images[0]
    } else {
      return '#'
    }
  }

  function handleSaveKeepit() {
    const request = {
      email: 'user@email',
      password: 'test',
      addedTags,
      imageIds,
      rated,
      geolocation,
    }
    saveKeepit(request)
    setOverlayStatus(true)
    setTimeout(function () {
      history.push('/')
    }, 1500)
  }

  function removeImage(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
    if (images.length - 1 === 0) {
      setTags([])
      history.push('/')
    }
  }
}

const StyledImageWrapper = styled.div`
  z-index: 100;
`
const StyledSaveOverlay = styled(Overlay)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 35vh auto 90px;
  max-width: 600px;
  overflow: scroll;
  left: 0;
  top: 0;
  width: 100%;
  font-size: 112.5%;
  align-items: end;
  background-color: white;
`

const StyledOptionArea = styled.div`
  padding: 0 30px;
  margin-bottom: 10px;
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

const StyledImageBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;

  filter: opacity(69%);
`

const StyledImage = styled.img`
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`
const StyledRemove = styled.div`
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  background-color: #ffffff75;
  margin-top: 2px;
  height: 30px;
  color: #535353;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 0 8px;
  svg  {
    margin-right: 5px;
  }
`
const StyledRemoveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
