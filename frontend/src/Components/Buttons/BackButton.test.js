import { render } from '@testing-library/react'
import BackButton from './BackButton'
describe('BackButton', () => {
  it('renders correctly', () => {
    const { container } = render(<BackButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
