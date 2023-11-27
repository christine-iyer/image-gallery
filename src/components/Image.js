import { useState, useEffect, useRef } from 'react'
import '../App.css'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';


export default function Image() {
     const [foundImages, setFoundImages]=useState(null)
     const [images, setImages] = useState([])
     const [image, setImage] = useState({
          link: '', 
          alt: '', 
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
 
       <section>
         <h1>Post Shamelessly</h1>
         <div>
           <span>
             <UploadWidget onUpload={handleOnUpload}>
               {({ open }) => {
                 function handleOnClick(e) {
                   e.preventDefault();
                   open();
                 }
                 return (
                   <button style={{ "backgroundColor": 'rgba(162, 134, 109, 0.5)' , 'marginBottom': "9px"}} onClick={handleOnClick}></button>
                 )
               }}
             </UploadWidget>
             {error && <p>{error}</p>}
             {url && (
            
               <div key={url._id} className='card' style={{ width: '8rem', 'marginBottom': '1px', 'backgroundColor': 'red' }}>
                 <img variant="top" src={url} alt='uploaded image' id="uploadedimage" style={{ 'width': 90, "borderRadius": "5%" }}></img>

               </div>
             )}
           </span>
 
           <br></br>
           <input
             type='text'
             value={image.link}
             onChange={handleChange}
             name="link"
             placeholder='Link'
           >
           </input>
           <br />
           <input
             value={image.alt}
             onChange={handleChange}
             name="alt"
             placeholder='Alt Text'>
           </input>
           <br />
           
           
           <button onClick={() => createImage()}>Display your Entry</button>
         </div>
       </section>
       <hr></hr>
       {images && images.length ? (
         <div className='collumns'>
           {images.map((image) => {
             return (
               <section key={image._id} className="w-75 p-3">
                
                     <img style={{ "maxWidth": "100%", "height": "15vw" }} src={image.link} alt={image.alt} fluid />
                  
                     <div>
                       <h1>{image.link}</h1>
                       <h2 onClick={() => setShowInput(!showInput)}>{image.alt}
                         <input
                           ref={inputRef}
                           style={{ display: showInput ? 'block' : 'none' }}
                           type='text'
                           onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                               e.preventDefault()
                               // const text = inputRef.current.value
                               updateImage(image._id, { link: e.target.value })
                               setShowInput(false)
                             }
                           }}
                           defaultValue={image.link}
                         />
                       </h2>
                 
                       <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeImage(image._id)}> {image.likes}</button>
                     </div>
               
               </section>
 
             )
           }
           )
           }
         </div>) : <>No Entries yet! Yet Add One Below this message</>
       }
     </>
 
   )
}