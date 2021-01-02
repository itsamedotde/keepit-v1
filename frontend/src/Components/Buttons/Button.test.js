import { render } from '@testing-library/react'
import Button from './Button'
describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(<Button />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
