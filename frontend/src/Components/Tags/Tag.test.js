import { render } from '@testing-library/react'
import Tag from './Tag'
describe('Tag', () => {
  it('renders correctly', () => {
    const { container } = render(<Tag />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
