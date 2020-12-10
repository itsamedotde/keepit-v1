import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as TagCloudIcon } from '../Assets/tag-cloud.svg'
import { ReactComponent as TagMinusIcon } from '../Assets/tag-minus.svg'
import { ReactComponent as TagPlusIcon } from '../Assets/tag-plus.svg'
import { ReactComponent as TagUserIcon } from '../Assets/tag-user.svg'

export default function Taglist({ onClick, tags, targetState }) {
  Taglist.propTypes = {
    onClick: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    targetState: PropTypes.bool.isRequired,
  }

  const stateIcon = targetState ? <TagPlusIcon /> : <TagMinusIcon />
  const bgColor = targetState
    ? 'var(--color-primary)'
    : 'var(--color-secondary)'

  function IsCustomIcon(test) {
    if (test.isCustom) {
      return <TagUserIcon />
    } else {
      return <TagCloudIcon />
    }
  }

  return (
    <StyledTagList bgcolor={bgColor}>
      {tags &&
        tags.map((tag, index) => (
          <li key={tag.value} onClick={() => onClick(tag.value, targetState)}>
            {stateIcon} <StyledTagText>{tag.value} </StyledTagText>
            <IsCustomIcon isCustom={tag.isCustom}></IsCustomIcon>
          </li>
        ))}
    </StyledTagList>
  )
}

const StyledTagText = styled.span`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 0.5px;
  margin: 0 5px 0 5px;
`

const StyledTagList = styled.ul`
  list-style-type: none;
  color: white;

  li {
    background-color: ${(props) => props.bgcolor};
    display: inline-block;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    min-width: 50px;
    display: inline-flex;
    align-items: center;
    padding: 5px;
    margin: 0 7px 7px 0px;
  }
`
