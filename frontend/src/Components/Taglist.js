import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function Taglist({ onClick, tags, targetState }) {
  Taglist.propTypes = {
    onClick: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    targetState: PropTypes.bool.isRequired,
  }
  if (tags >= 0) {
    return <div>Loadings Tags...</div>
  }
  return (
    tags &&
    tags.map((tag, index) => (
      <StyledTag
        key={tag.value}
        onClick={() => onClick(tag.value, targetState)}
      >
        {tag.value}
      </StyledTag>
    ))
  )
}

const StyledTag = styled.span`
  background-color: #e0bd6d;
  padding: 5px;
  margin: 5px;
  display: inline-block;
`
