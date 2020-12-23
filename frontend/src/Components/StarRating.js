import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Star } from '../Assets/star.svg'

export default function StarRating({ rating, className }) {
  return (
    <StyledStarRatingDiv className={className}>
      {[...Array(rating)].map(() => (
        <Star
          width="30"
          height="30"
          stroke="#e3e3e3"
          fill="var(--color-primary)"
        ></Star>
      ))}
    </StyledStarRatingDiv>
  )
}

const StyledStarRatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 15px;
  svg {
    height: 12px;
    margin-left: 3px;
  }
`
