import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { StarIcon } from '../Icons'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ImageNotFoundImg from '../../Assets/image-not-found.png'

export default function KeepitList({ keepits, className }) {
  const history = useHistory()
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  console.log(keepits)
  if (keepits.length === 0) {
    return <LoadingSpinner />
  }

  function gotoDetail(keepit) {
    history.push('/detail/' + keepit.id, { keepit: keepit })
  }

  return (
    <StyledUl className={className}>
      {keepits.map((keepit, index) => (
        <li key={index}>
          <StyledImg
            src={
              keepit.images
                ? apiBaseUrl + '/' + keepit.images[0].replace('.', '-thumb.')
                : ImageNotFoundImg
            }
            alt=""
            onClick={() => gotoDetail(keepit)}
          ></StyledImg>
          <StyledStarRating>
            {[...Array(keepit.rated)].map((index) => (
              <StarIcon
                width="5"
                key={index}
                fill="var(--color-primary)"
              ></StarIcon>
            ))}
          </StyledStarRating>
        </li>
      ))}
    </StyledUl>
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
  position: absolute;
  height: 12px;
  z-index: 1;
  background-color: #00000059;
  padding-right: 5px;
  height: 15px;
  color: white;
  text-align: center;

  svg {
    height: 12px;
    margin-left: 3px;
  }
`
const StyledImg = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  border: 1px dotted #e3e3e3;
  border-radius: 2px;
  cursor: pointer;
`
const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  li {
    height: 20vh;
    flex-grow: 4;
    position: relative;
    align-self: flex-start;

    &:last-child {
      flex-grow: 1;
      margin-right: auto;
    }
  }
`
