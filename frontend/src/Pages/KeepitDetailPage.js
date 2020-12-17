import Footer from '../Components/Footer'
import Header from '../Components/Header'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Taglist from '../Components/Taglist'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { ReactComponent as EditIcon } from '../Assets/edit.svg'
import { ReactComponent as TagIcon } from '../Assets/tag.svg'
import { ReactComponent as Star } from '../Assets/star.svg'

import { ReactComponent as DeleteIcon } from '../Assets/delete.svg'
import ContentSeparator from '../Components/ContentSeparator'

import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

export default function KeepitDetailPage({ props }) {
  const history = useHistory()

  const keepit = history.location.state.keepit
  const imageUrl = 'http://keepit-be.local/' + keepit.images[0]
  const tags = keepit.tags
  const [modalImage, setModalImage] = useState()

  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false)
  Modal.setAppElement('#root')
  var subtitle
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'none',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#00000096',
    },
  }
  function openModal(url) {
    setModalImage(url)
    setIsOpen(true)
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false)
  }
  // MODAL END

  const modalContent = () => {}

  console.log('keepit in detail', keepit)
  return (
    <>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImageBg onClick={() => openModal(imageUrl)} bgImg={imageUrl} />

          <StyledSubInfos>
            <StyledDate>
              28.02.2020<br></br>Hamburg
            </StyledDate>
            <StyledSubMenu>
              <StyedIconWrapperLeft>
                <DeleteIcon />
                Delete
              </StyedIconWrapperLeft>
              <StyedIconWrapperRight>
                <EditIcon />
                Edit
              </StyedIconWrapperRight>
            </StyledSubMenu>
          </StyledSubInfos>
        </StyledImageArea>
        <StyledTagArea>
          <TagIcon />
          <StyledTagHeadline>Tags</StyledTagHeadline>
          <StyledStarRating>
            {[...Array(keepit.rated)].map(() => (
              <Star
                width="20"
                stroke="#e3e3e3"
                fill="var(--color-primary)"
              ></Star>
            ))}
          </StyledStarRating>
          <ContentSeparator></ContentSeparator>
          <Taglist
            tags={tags}
            onClick=""
            bgColor="var(--color-primary)"
            showIsCustom={true}
          ></Taglist>
        </StyledTagArea>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <StyledModalImage
            onClick={closeModal}
            src={modalImage}
            width="100%"
          />
        </Modal>
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

const StyledStarRating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top-right-radius: 6px;
  font-weight: 600;
  bottom: 1px;
  left: 1px;
  float: right;
  height: 12px;
  z-index: 1;
  padding-right: 5px;
  height: 15px;
  color: white;
  text-align: center;
  svg {
    height: 12px;
    margin-left: 3px;
  }
`

const StyledDate = styled.div`
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

const StyledSubInfos = styled.div`
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

const StyledImageBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`
const StyledImage = styled.img`
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  border-radius: 3px;
  max-width: 40%;
  max-height: 500px;
`
const StyledModalImage = styled.img`
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  border-radius: 3px;
`

/*

        <iframe
          title="test"
          width="150"
          height="150"
          frameborder="0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7dbuH6DnrjMDEWSgb2wnTGuXtS00GPQU&q=Space+Needle,Seattle+WA"
          allowfullscreen
        ></iframe>

      {keepit.images.map((image) => (
            <StyledImage
              src={'http://keepit-be.local/' + image}
              onClick={() => openModal('http://keepit-be.local/' + image)}
            />
          ))}

*/

/*
          <StyledImageBg onClick={() => openModal(imageUrl)} bgImg={imageUrl} />
 {keepit.images.map((image) => (
            <StyledImage
              src={'http://keepit-be.local/' + image}
              onClick={() => openModal('http://keepit-be.local/' + image)}
              height="300"
            />
          ))}
*/
