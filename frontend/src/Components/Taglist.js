import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as TagCloudIcon } from '../Assets/tag-cloud.svg'
import { ReactComponent as TagMinusIcon } from '../Assets/tag-minus.svg'
import { ReactComponent as TagPlusIcon } from '../Assets/tag-plus.svg'
import { ReactComponent as TagUserIcon } from '../Assets/tag-user.svg'
import loading from '../Assets/loading.gif' // Tell webpack this JS file uses this image

export default function Taglist({ onClick, tags, targetState }) {
  Taglist.propTypes = {
    onClick: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    targetState: PropTypes.bool.isRequired,
  }

  const stateIcon = targetState ? <TagPlusIcon /> : <TagMinusIcon />
  const bgColor = targetState ? 'var(--color-primary)' : '#828282'

  function IsCustomIcon(test) {
    if (test.isCustom) {
      return <TagUserIcon />
    } else {
      return <TagCloudIcon />
    }
  }

  if (tags.length === 0 && targetState) {
    return (
      <>
        <StyledLoading>
          <img width="20" src={loading}></img>
        </StyledLoading>
      </>
    )
  }

  return (
    <StyledTagList bgcolor={bgColor}>
      {tags &&
        tags.map((tag, index) => (
          <li key={tag.value} onClick={() => onClick(tag.value, targetState)}>
            <StyledTagText>{tag.value} </StyledTagText>
            <IsCustomIcon isCustom={tag.isCustom}></IsCustomIcon>
          </li>
        ))}
    </StyledTagList>
  )
}

const StyledTagText = styled.span`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0 8px 0 5px;
`

const StyledTagList = styled.ul`
  list-style-type: none;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  li {
    background-color: ${(props) => props.bgcolor};
    display: inline-block;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    min-width: 50px;
    display: inline-flex;
    align-items: center;
    padding: 5px 10px 5px 5px;
  }
`
const StyledLoading = styled.div`
  text-align: center;
  font-size: 12px;
`
/*
    margin: 0px 7px 7px 0px;

*/
