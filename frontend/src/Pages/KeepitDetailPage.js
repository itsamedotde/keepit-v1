import Footer from '../Components/Footer'
import Header from '../Components/Header'
import UploadButtonFooter from '../Components/UploadButtonFooter'
import BackButton from '../Components/BackButton'
import SearchButton from '../Components/SearchButton'
import Taglist from '../Components/Taglist'

import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

export default function KeepitDetailPage({ props }) {
  const history = useHistory()
  const keepit = history.location.state.keepit
  const imageUrl = 'http://keepit-be.local/' + keepit.images[0]
  const tags = keepit.tags

  console.log('keepit in detail', keepit)
  return (
    <>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImageBg bgImg={imageUrl} />
          <StyledImage src={imageUrl} />
        </StyledImageArea>
        <StyledTagArea>
          <Taglist
            tags={tags}
            onClick=""
            bgColor="var(--color-tertiary)"
            showIsCustom={true}
          ></Taglist>
        </StyledTagArea>
        <Footer
          actionButtonText=""
          actionButton={<UploadButtonFooter />}
          left={<BackButton height="30px" width="30px" />}
          right={<SearchButton />}
        ></Footer>
      </StyledLayout>
    </>
  )
}
const StyledTagArea = styled.div`
  padding: 0 30px;
  margin-bottom: 10px;
`
const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 5fr 2fr 90px;
  max-width: 600px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
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
  filter: opacity(30%);
`
const StyledImage = styled.img`
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  border-radius: 3px;
  width: 50%;
`
