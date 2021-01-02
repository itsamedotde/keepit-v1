import { render } from '@testing-library/react'
import LogoutButton from './LogoutButton'
describe('LogoutButton', () => {
  it('renders correctly', () => {
    const { container } = render(<LogoutButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
