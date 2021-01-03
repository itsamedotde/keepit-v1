import { render } from '@testing-library/react'
import TaglistNewKeepit from './TaglistNewKeepit'
describe('TaglistNewKeepit', () => {
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
      <TaglistNewKeepit
        tags={tags}
        bgColor="var(--color-primary)"
        showIsCustom={true}
        showIsloading={true}
      ></TaglistNewKeepit>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
