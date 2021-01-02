import { render } from '@testing-library/react'
import SaveButtonFooter from './SaveButtonFooter'
describe('SaveButtonFooter', () => {
  it('renders correctly', () => {
    const { container } = render(<SaveButtonFooter />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
