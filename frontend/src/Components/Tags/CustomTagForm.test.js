import { render } from '@testing-library/react'
import CustomTagForm from './CustomTagForm'
describe('CustomTagForm', () => {
  it('renders correctly', () => {
    const { container } = render(<CustomTagForm />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
