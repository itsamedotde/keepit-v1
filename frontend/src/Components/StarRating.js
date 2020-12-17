import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Star } from '../Assets/star.svg'
import { useState, useEffect } from 'react'

export default function StarRating({ onClick }) {
  const [rating, setRating] = useState(null)

  useEffect(() => {
    onClick(rating)
    console.log(rating)
  }, [rating])

  return (
    <div>
      <StyledFieldset>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1
          return (
            <label>
              <StyledInput
                type="radio"
                value={ratingValue}
                name="rating"
                onClick={() => setRating(ratingValue)}
              />
              <Star
                fill={
                  ratingValue <= rating
                    ? 'var(--color-primary)'
                    : 'var(--color-tertiary)'
                }
              ></Star>
            </label>
          )
        })}
      </StyledFieldset>
    </div>
  )
}

const StyledInput = styled.input`
  display: none;
`
const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 5px;

  svg {
    cursor: pointer;
  }
`
