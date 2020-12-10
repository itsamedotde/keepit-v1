import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as TagCloudIcon } from '../Assets/tag-cloud.svg'
import { ReactComponent as TagMinusIcon } from '../Assets/tag-minus.svg'
import { ReactComponent as TagPlusIcon } from '../Assets/tag-plus.svg'
import { ReactComponent as TagUserIcon } from '../Assets/tag-user.svg'

export default function Tag({ onClick, tagValue, targetState }) {
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
    <StyledTag bgcolor={bgColor} onClick={() => onClick(tagValue, targetState)}>
      {tagValue}
    </StyledTag>
  )
}

const StyledTag = styled.span`
  background-color: ${(props) => props.bgcolor};
  display: inline-block;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;

  display: inline-flex;
  align-items: center;
  padding: 5px;
  margin: 0 7px 7px 0px;
  color: white;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.5px;
`

/*

  background-color: ${(props) => props.bgcolor};
  display: inline-block;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  min-width: 50px;
  display: inline-flex;
  align-items: center;
  padding: 5px;
  margin: 0 7px 7px 0px;


*/
