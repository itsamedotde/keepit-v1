import { render } from '@testing-library/react'
import Taglist from './Taglist'
describe('Taglist', () => {
  const tags = [
    {
      value: 'Beer',
      added: false,
      isCustom: false,
    },
    {
      value: 'Barware',
      added: false,
      isCustom: false,
    },
  ]

  it('renders correctly', () => {
    const { container } = render(
      <Taglist
        tags={tags}
        bgColor="var(--color-primary)"
        showIsCustom={false}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
