import { render } from '@testing-library/react'
import StarRatingForm from './StarRatingForm'
describe('StarRatingForm', () => {
  it('renders correctly', () => {
    const { container } = render(<StarRatingForm />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
