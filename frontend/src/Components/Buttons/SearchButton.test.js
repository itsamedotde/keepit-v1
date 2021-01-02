import { render } from '@testing-library/react'
import SearchButton from './SearchButton'
describe('SearchButton', () => {
  it('renders correctly', () => {
    const { container } = render(<SearchButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
