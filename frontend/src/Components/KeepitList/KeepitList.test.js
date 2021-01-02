import { render } from '@testing-library/react'
import KeepitList from './KeepitList'
import testImage from '../../Assets/test.png'

describe('KeepitList', () => {
  const keepits = [
    {
      rated: 4,
      city: 'Hamburg',
      country: 'Germany',
      date: {
        date: '2020-12-29 00:00:00.000000',
        timezone_type: 3,
        timezone: 'UTC',
      },
      id: 187,
      images: [testImage],
      tags: [
        {
          value: 'Beer',
          isCustom: false,
        },
        {
          value: 'Alcohol',
          isCustom: false,
        },
      ],
    },
  ]

  it('renders correctly', () => {
    const { container } = render(<KeepitList keepits={keepits} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  // it('image shown', () => {
  //   const { container, getByTestId, getByText } = render(
  //     <KeepitList keepits={keepits} />
  //   )
  //   const ImgContainer = getByTestId('keepitImg')
  //   expect(ImgContainer).toHaveStyle(`max-height: 100%;`)
  //   expect(ImgContainer).toHaveAttribute('src', 'undefined/' + testImage)
  // })
})

/*

const data = [
  {
    "rated": 4,
    "city": "Hamburg",
    "country": "Germany",
    "date": {
      "date": "2020-12-29 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "UTC"
    },
    "id": 187,
    "images": [
      "uploads/5feb0c39a9339.jpeg"
    ],
    "tags": [
      {
        "value": "Beer",
        "isCustom": false
      },
      {
        "value": "Alcohol",
        "isCustom": false
      }
    ]
  }
]

*/
