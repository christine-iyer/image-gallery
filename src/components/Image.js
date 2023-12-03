import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { makeStyles } from "@material-ui/core/styles";
// import { Carousel } from 'react-carousel-minimal';
import setClass from '../utilities/category-class'
import '../App.css'
import styles from './Image.module.scss'

export default function Image() {
  const [foundImages, setFoundImages] = useState(null)
  const [images, setImages] = useState([])
  const [image, setImage] = useState({
    link: '',
    alt: '',
    category: '',
    likes: 0
  })
  const [showInput, setShowInput] = useState(false)
  const [url, updateUrl] = useState(false);
  const [error, updateError] = useState();
  const inputRef = useRef(null)
  const handleChange = (evt) => {
    setImage({ ...image, [evt.target.name]: evt.target.value })
  }

  const getImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      setImages(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createImage = async () => {
    try {
      const response = await fetch('/api/images', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...image })
      })
      const data = await response.json()
      setFoundImages(data)
      setImage({
        link: '',
        alt: '',
        category: '',
        likes: 0
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      // const imagesCopy = [...images]
      // const index = imagesCopy.findIndex(image => id === image._id)
      // imagesCopy.splice(index, 1)
      // setImages(imagesCopy)
      setFoundImages(data)
    } catch (error) {
      console.error(error)
    }
  }
  const updateImage = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      setFoundImages(data)
      const imagesCopy = [...images]
      const index = imagesCopy.findIndex(image => id === image._id)
      imagesCopy[index] = { ...imagesCopy[index], ...updatedData }
      setImages(imagesCopy)
    } catch (error) {
      console.error(error)
    }
  }

  const likeImage = async (id) => {
    try {
      const index = images.findIndex((image) => image._id === id)
      const imagesCopy = [...images]
      const subject = imagesCopy[index]
      subject.likes = subject.likes + 1
      const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedImage = await response.json()
      const completedImagesCopy = [updatedImage, ...images]

      setImages(completedImagesCopy)
      // imagesCopy.splice(index, 1)
      setImages(imagesCopy)

    } catch (error) {
      console.error(error)
    }
  }
  // const useStyles = makeStyles({
  //   captionStyle :{
  //      fontSize: '2em',
  //      fontWeight: 'bold',
  //    },
  //     slideNumberStyle:{
  //      fontSize: '20px',
  //      fontWeight: 'bold',
  //    }
   
   
     
  //  });
  //  const captionStyle = {
  //    fontSize: '2em',
  //    fontWeight: 'bold',
  //  }
  //  const slideNumberStyle = {
  //    fontSize: '20px',
  //    fontWeight: 'bold',
  //  }
  useEffect(() => {
    getImages()
  }, [foundImages])

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true
      });
      return;
    }
    console.dir(result);
    updateUrl(result?.info?.secure_url);
    console.dir(url);
    setImage({
      link: result?.info?.secure_url,
      alt: '',
      likes: 0
    })
  }
  return (
    <>
      <div className='canvas'>
        <h1>Lorelei's Art</h1>
        <div className='uploadForm'>
          <div>
            <span>
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button style={{
                      'size': 'xx-large',
                      'alignContent': 'center',
                      'border': 'none',
                      'borderRadius': '25%',
                      'font': 'caption',
                      'height': '29px'
                    }}
                      onClick={handleOnClick}>📷</button>
                  )
                }}
              </UploadWidget>
              {error && <p>{error}</p>}
              {url && (
                <div key={url._id} className='card' style={{ width: '8rem', 'marginBottom': '1px' }}>
                  <img variant="top" src={url} alt='uploaded image' id="uploadedimage" style={{ 'width': 90, "borderRadius": "5%" }}></img>
                </div>
              )}
            </span>

            <select
              options={image.category}
              value={image.category}
              onChange={handleChange}
              defaultValue={"placeholder"}
              name="category"
            >
              <option value={"placeholder"}>Choose Medium</option>
              <option value="Paint">Paint</option>
              <option value="Markers">Markers</option>
              <option value="Crayons">Crayons</option>
              <option value="Mixed Medium">Mixed</option>
              <option value="Schoolwork">Schoolwork</option>
            </select>

            <input
              value={image.alt}
              onChange={handleChange}
              name="alt"
              placeholder='Caption:'>
            </input>
            <button onClick={() => createImage()}>Add to Gallery</button>
          </div>
        </div>
        <hr></hr>
        <div>
          {images && images.length ? (
            <ul key={image.id} className='collumns'>
              {images.map((image) => {
                return (
                  <>
                  <div>
                    <li  className={setClass(image, styles)} >
                      <img style={{ "maxWidth": "100%", "height": "15vw" }} src={image.link} alt={image.alt} />
                      <p onClick={() => setShowInput(!showInput)}>{image.alt}
                        <input
                          ref={inputRef}
                          style={{ display: showInput ? 'block' : 'none' }}
                          type='text'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              //const alt = inputRef.current.value
                              updateImage(image._id, { alt: e.target.value })
                              setShowInput(false)
                            }
                          }}
                          defaultValue={image.alt}
                        />
                      </p>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeImage(image._id)}> {image.likes}💜</button>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => deleteImage(image._id)}>❌</button>
                    </li>
                    </div>
                  </>
                )
              }
              )}
            </ul>) :
            <>No Entries yet! Yet Add One Below this message</>
          }
        </div>
      </div>
    </>
  )
}