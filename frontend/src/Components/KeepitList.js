import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import loading from '../Assets/loading.gif'
import { useHistory, useLocation } from 'react-router-dom'

export default function KeepitList({ keepits }) {
  const history = useHistory()

  const StyledLoading = styled.div`
    text-align: center;
    font-size: 12px;
  `

  if (keepits.length === 0) {
    return (
      <StyledLoading>
        <img width="20" src={loading}></img>
      </StyledLoading>
    )
  }

  function gotoDetail(keepit) {
    console.log('redirect to', keepit)
    history.push('/detail/' + keepit.id, { keepit: keepit })
  }

  return (
    <StyledUl>
      {keepits.map((keepit, index) => (
        <StyledLi>
          <StyledImg
            src={'http://keepit-be.local/' + keepit.images[0]}
            alt=""
            key={keepit.id}
            onClick={() => gotoDetail(keepit)}
          ></StyledImg>
        </StyledLi>
      ))}
    </StyledUl>
  )
}
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
  flex-basis: | auto;
`
const StyledLi = styled.li`
  height: 12vh;
  flex-grow: 4;

  &:last-child {
    flex-grow: 0;
    margin-right: auto;
  }
`
