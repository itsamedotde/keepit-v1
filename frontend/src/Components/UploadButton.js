import React from 'react'
import ImageUploading from 'react-images-uploading'
import { useHistory, useLocation } from 'react-router-dom'

export default function UploadButton() {
  const history = useHistory()
  const maxNumber = 3
  const location = useLocation()

  const onChange = (imageList, addUpdateIndex) => {
    history.push('/new', { images: imageList })
    if (location.pathname === '/new') {
      window.location.reload()
    }
  }

  /* 
    const [test, setTest] = useState([{dataurl : 'first' }]);

    useEffect(() => {
        console.log('TEST INHALT (useEffect)', test)
        console.log(test.length)
    }, [test])

    function getBase64(file) {

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //console.log(reader.result);
            setTest([...test, {dataurl : file.name }])
            console.log('// to base64: ', file.name)
            file = '';
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    */
  function imagechoosen(e) {
    //getBase64(e.target.files[0]);
    //getBase64(e.target.files[1]);
  }

  return (
    <div>
      <input
        disabled
        type="file"
        multiple
        style={{ display: 'none' }}
        name="keepinput"
        onChange={(e) => imagechoosen(e)}
        accept="image/png, image/jpeg, image/jpg, image/gif"
      />
      <ImageUploading
        multiple
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload }) => (
          <div className="upload__image-wrapper">
            <button onClick={onImageUpload}>Upload via extension...</button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
