import { apiGetVisionLabels, apiSaveKeepit } from '../Services/apiRequests.js'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../Assets/keepit-button.svg'

export default function TestPage() {
  const [imageList, setImageList] = useState([])
  const history = useHistory()

  const location = useLocation()

  const gotoNew = () => {
    console.log('goto new with', imageList)
    if (imageList.length > 0) {
      history.push('/new', { images: imageList })
      //   history.push('/new')
    }
    if (location.pathname === '/new') {
      window.location.reload()
    }
  }

  useEffect(() => {
    setTimeout(function () {
      console.log('imageList', imageList)
      console.log('imageList - länge', imageList.length)
      gotoNew()
    }, 500)
  })

  useEffect(() => {}, [])

  function onChangePicture(event) {
    setImageList(event.target.files)

    ////////////////// /
    event.preventDefault()

    var files = event.target.files //FileList object

    // var images = []
    // for (var i = 0; i < files.length; i++) {
    //   var file = files[i]
    //   var picReader = new FileReader()
    //   picReader.addEventListener('load', function (event) {
    //     var picFile = event.target
    //     // console.log('picFile.result', picFile.result)
    //     images.push(picFile.result)
    //   })
    //   //Read the image
    //   picReader.readAsDataURL(file)
    // }
    // //console.log(images)
    // setImageList(images)

    ///////////////////////////////////
  }

  return (
    <form>
      <input
        alt="image-input"
        name="image"
        type="file"
        onChange={onChangePicture}
        accept="image/x-png,image/gif,image/jpeg"
        multiple
      />
      <button type="submit">DDD</button>
    </form>
  )
}

/*


 console.log('change...', event.target.files)
    let images = []
    const files = event.target.files
    // console.log('files...', files)
    // console.log('files.length...', files.length)

    for (var index in event.target.files) {

    
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        images.push(reader.result)
      })
      reader.readAsDataURL(event.target.files[index])
    
    }

    console.log('IMAGES', images)
*/
