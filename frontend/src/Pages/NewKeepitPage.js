import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { apiGetVisionLabels, apiSaveKeepit } from '../Services/apiRequests.js'
import styled from 'styled-components/macro'
import Taglist from '../Components/Taglist'
import Taglist2 from '../Components/Taglist2'

import CustomTagForm from '../Components/CustomTagForm'
import Footer from '../Components/Footer'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import SaveButtonFooter from '../Components/SaveButtonFooter'
import ContentSeparator from '../Components/ContentSeparator'
import useTags from '../Hooks/useTags'
import Header from '../Components/Header'
import StarRating from '../Components/StarRating'
import { ReactComponent as Star } from '../Assets/star.svg'
import { ReactComponent as TagIcon } from '../Assets/tag.svg'

import ContentSeperatorText from '../Components/ContentSeperatorText'

export default function NewKeepitPage() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [imageIds, setImageIds] = useState([])
  const [rated, setRated] = useState([])

  const {
    tags,
    addedTags,
    newTags,
    handleSubmitTag,
    updateTag,
    updateTag2,
    setTags,
  } = useTags()

  useEffect(() => {
    loadApiTags()
  }, [])

  return (
    <>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImageBg bgImg={setBgImg}></StyledImageBg>
          {images &&
            images.map((image, index) => (
              <div key={index}>
                <StyledImage src={image['data_url']} alt="" height="100" />
                <br></br>
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
        </StyledImageArea>
        <StyledTagArea>
          <ContentSeperatorText
            text="RATING"
            icon={<Star fill="#c7c7c7" width="12" height="12" />}
          />
          <StarRating onClick={rating}></StarRating>
          <ContentSeperatorText
            text="TAGS"
            icon={<TagIcon fill="#c7c7c7" width="11" height="11" />}
          />
          <Taglist2
            tags={tags}
            onClick={updateTag2}
            bgColor="var(--color-primary)"
            showIsCustom={true}
            showIsloading={true}
          ></Taglist2>

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
    console.log('rating...', rating)
  }

  function setBgImg() {
    if (images.length > 0) {
      return images[0]['data_url']
    } else {
      return '#'
    }
  }

  function loadApiTags() {
    const historyImages = history.location.state.images
    if (historyImages) {
      setImages(historyImages)
      history.replace('/new', { images: '' })
      const files = historyImages
      const labelRequest = {
        email: 'user@email',
        password: 'test',
        files,
      }
      apiGetVisionLabels(labelRequest)
        .then((result) => handleApiTags(result))
        .catch((error) => console.log('error', error))
    }
  }

  function handleApiTags(response) {
    const uniqueApiTags = [...new Set(response.labels)]
    const expandedTags = uniqueApiTags.map((value, index) => {
      return { value: value, added: false, isCustom: false }
    })
    setTags(expandedTags)
    setImageIds(response.ids)
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
    }
    apiSaveKeepit(request)
      .then((result) => handleApiTags(result))
      .catch((error) => console.log('error', error))

    history.push('/')
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
  border-radius: 3px;
`
