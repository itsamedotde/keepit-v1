import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as TagCloudIcon } from '../Assets/tag-cloud.svg'
import { ReactComponent as TagMinusIcon } from '../Assets/tag-minus.svg'
import { ReactComponent as TagPlusIcon } from '../Assets/tag-plus.svg'
import { ReactComponent as TagUserIcon } from '../Assets/tag-user.svg'
import loading from '../Assets/loading.gif'

export default function TaglistNew({
  onClick,
  tags,
  bgColor,
  showIsCustom,
  showIsloading,
}) {
  function IsCustomIcon(tag) {
    if (showIsCustom) {
      if (tag.isCustom) {
        return <TagUserIcon />
      } else {
        return <TagCloudIcon />
      }
    } else {
      return ''
    }
  }
  function IsAdded(tag) {
    if (!tag.added) {
      return <TagPlusIcon />
    } else {
      return <TagMinusIcon />
    }
  }

  if (tags.length === 0 && showIsloading) {
    return (
      <StyledLoading>
        <img width="20" src={loading}></img>
      </StyledLoading>
    )
  }

  return (
    <StyledTagList>
      {tags &&
        tags.map((tag, index) => (
          <StyledLi
            bgcolor={
              tag.added ? 'var(--color-primary)' : 'var(--color-tertiary)'
            }
            key={tag.value}
            onClick={() => onClick(tag.value, !tag.added, tag.isCustom)}
          >
            {IsAdded(tag)}
            <StyledTagText>{tag.value}</StyledTagText>
            <IsCustomIcon isCustom={tag.isCustom}></IsCustomIcon>
          </StyledLi>
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
  min-height: 24px;
`

const StyledLi = styled.li`
  background-color: ${(props) => props.bgcolor};
  transition: background-color 0.4s ease-out;

  display: inline-block;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  min-width: 50px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px 5px 5px;
  border-left: 2px solid #e3e3e3;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
`

const StyledLoading = styled.div`
  text-align: center;
  font-size: 12px;
`
