import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { apiGetVisionLabels, apiSaveKeepit } from '../Services/apiRequests.js'
import styled from 'styled-components/macro'
import TaglistNewKeepit from '../Components/TaglistNewKeepit'
import CustomTagForm from '../Components/CustomTagForm'
import Footer from '../Components/Footer'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import SaveButtonFooter from '../Components/SaveButtonFooter'
import useTags from '../Hooks/useTags'
import Header from '../Components/Header'
import StarRatingForm from '../Components/StarRatingForm'
import { ReactComponent as Star } from '../Assets/star.svg'
import { ReactComponent as TagIcon } from '../Assets/tag.svg'
import { ReactComponent as Done } from '../Assets/done.svg'
import { ReactComponent as DeleteIcon } from '../Assets/delete.svg'
import useGeolocation from '../Hooks/useGeolocation'

import ContentSeparator from '../Components/ContentSeparator'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [rated, setRated] = useState([])

  const {
    tags,
    setTags,
    addedTags,
    handleSubmitTag,
    updateTag,
    loadApiTags,
    handleApiTags,
    imageIds,
  } = useTags()

  const { geolocation, getBrowserLocation } = useGeolocation()

  useEffect(() => {
    loadHistoryImages()
    getBrowserLocation()
  }, [])

  useEffect(() => {
    console.log('images', images)
    loadApiTags(images)
  }, [images])

  async function loadHistoryImages() {
    const newImagesPromises = []
    Array.from(history.location.state.images).forEach((file) => {
      newImagesPromises.push(setBase64(file))
    })
    setImages(await Promise.all(newImagesPromises))
  }

  function setBase64(file) {
    return new Promise((res) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        res(reader.result)
      })
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImageBg bgImg={setBgImg}></StyledImageBg>
          {images &&
            images.map((image, index) => (
              <div key={index}>
                <StyledImage src={image} alt="" height="160" />
                <StyledRemoveWrapper>
                  <StyledRemove onClick={() => removeImage(index)}>
                    <DeleteIcon width="11"></DeleteIcon> Delete
                  </StyledRemove>
                </StyledRemoveWrapper>
              </div>
            ))}
        </StyledImageArea>
        <StyledTagArea>
          <ContentSeparator
            text="RATING"
            icon={<Star fill="#c7c7c7" width="12" height="12" />}
          />
          <StarRatingForm onClick={rating}></StarRatingForm>
          <ContentSeparator
            text="TAGS"
            icon={<TagIcon fill="#c7c7c7" width="11" height="11" />}
          />
          <TaglistNewKeepit
            tags={tags}
            onClick={updateTag}
            bgColor="var(--color-primary)"
            showIsCustom={true}
            showIsloading={true}
          ></TaglistNewKeepit>

          <CustomTagForm onSubmit={handleSubmitTag} />
        </StyledTagArea>
      </StyledLayout>
      <Footer
        actionButtonText="Save Keepit"
        actionButton={<SaveButtonFooter onClick={saveKeepit} />}
        left={<BackButton height="30px" width="30px" />}
        right={<SearchButton />}
      ></Footer>
    </>
  )

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

  function saveKeepit() {
    const requestTags = addedTags.map((addedTag) => {
      return { value: addedTag.value, isCustom: addedTag.isCustom }
    })
    const request = {
      email: 'user@email',
      password: 'test',
      requestTags,
      imageIds,
      rated,
      geolocation,
    }
    apiSaveKeepit(request)
      .then((result) => handleApiTags(result))
      .catch((error) => console.log('error', error))
    setTimeout(function () {
      history.push('/')
    }, 1500)
    // history.push('/')
  }

  function removeImage(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
    if (images.length - 1 === 0) {
      setTags([])
      history.push('/')
    }
  }
}

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 35vh auto 90px;
  max-width: 600px;

  overflow: scroll;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
  align-items: end;
`
const StyledTagArea = styled.div`
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
  z-index: -1;
  background: url(${(props) => props.bgImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
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
