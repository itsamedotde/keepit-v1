import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { SearchIcon } from '../Icons'

export default function SearchButton({ onClick }) {
  return <SearchIcon onClick={onClick}></SearchIcon>
}
//
