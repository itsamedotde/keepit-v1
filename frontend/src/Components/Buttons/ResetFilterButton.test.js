import { render } from '@testing-library/react'
import ResetFilterButton from './ResetFilterButton'
describe('ResetFilterButton', () => {
  it('renders correctly', () => {
    const { container } = render(<ResetFilterButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
