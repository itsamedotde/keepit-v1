import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import loading from '../Assets/loading.gif'
import { useHistory } from 'react-router-dom'
import { useState, Suspense, react } from 'react'
import { ReactComponent as Star } from '../Assets/star.svg'

export default function KeepitList({ keepits, className }) {
  const history = useHistory()
  const [loaded, setLoaded] = useState(false)
  const [numOfloaded, setNumOfloaded] = useState(0)

  const StyledLoading = styled.div`
    text-align: center;
    font-size: 12px;
  `
  console.log('keepits in overview:', keepits)

  if (keepits.length === 0) {
    return (
      <StyledLoading>
        <img width="20" src={loading}></img>
      </StyledLoading>
    )
  }

  // function test() {
  //   setNumOfloaded(numOfloaded + 1)
  //   if (numOfloaded === 26) {
  //     setTimeout(function () {
  //       setLoaded(true)
  //     }, 500)
  //   }
  //   console.log(keepits.length)
  //   console.log('loaded...', numOfloaded)
  // }

  function gotoDetail(keepit) {
    console.log('redirect to', keepit)
    history.push('/detail/' + keepit.id, { keepit: keepit })
  }

  return (
    <StyledUl className={className}>
      {keepits.map((keepit, index) => (
        <StyledLi key={keepit.images[0]}>
          <StyledImg
            src={'http://keepit-be.local/' + keepit.images[0]}
            alt=""
            onClick={() => gotoDetail(keepit)}
          ></StyledImg>
          <StyledStarRating>
            {[...Array(keepit.rated)].map(() => (
              <Star width="5" fill="var(--color-primary)"></Star>
            ))}
          </StyledStarRating>
        </StyledLi>
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
`
const StyledLi = styled.li`
  height: 20vh;
  flex-grow: 4;
  position: relative;
  align-self: flex-start;

  &:last-child {
    flex-grow: 1;
    margin-right: auto;
  }
`
/*
    {[...Array(keepit.rated)].map(() => (
              <Star width="10" fill="var(--color-primary)"></Star>
            ))}
 #ffffffdb;
*/

/*

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 6px;
  font-weight: 600;
  bottom: 0;
  position: absolute;
  height: 15px;
  z-index: 1;
  width: 100%;
  background-color: #00000059;
  font-size: 12px;
  width: 30px;
  height: 20px;
  color: white;

  text-align: center;

  svg {
    height: 12px;
    margin-left: 3px;
  }

  */

/*
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
`
const StyledLi = styled.li`
  height: 12vh;
  flex-grow: 4;
  position: relative;
  align-self: flex-start;

  &:last-child {
    flex-grow: 0;
    margin-right: auto;
  }
`

  */
