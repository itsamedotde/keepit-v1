import { render } from '@testing-library/react'
import StarRating from './StarRating'
describe('StarRating', () => {
  it('renders correctly', () => {
    const { container } = render(<StarRating />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
