import { render } from '@testing-library/react'
import Overlay from './Overlay'
describe('Overlay', () => {
  it('renders correctly', () => {
    const { container } = render(<Overlay />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
