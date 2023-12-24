import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from '../Image/UploadWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import setClass from '../../utilities/category-class'
// import '../App.css'
import styles from './Lolo.module.scss'


export default function Lolo() {
  const [foundLolos, setFoundLolos] = useState(null)
  const [lolos, setLolos] = useState([])
  const [lolo, setLolo] = useState({
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
    setLolo({ ...lolo, [evt.target.name]: evt.target.value })
  }



  const getLolos = async () => {
    try {
      const response = await fetch('/api/lolos')
      const data = await response.json()
      setLolos(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createLolo = async () => {
    try {
      const response = await fetch('/api/lolos', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...lolo })
      })
      const data = await response.json()
      setFoundLolos(data)
      setLolo({
        link: '',
        alt: '',
        category: '',
        likes: 0
      })
   
    } catch (error) {
      console.error(error)
    }
  }

  const deleteLolo = async (id) => {
    try {
      const response = await fetch(`/api/lolos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      // const lolosCopy = [...lolos]
      // const index = lolosCopy.findIndex(lolo => id === lolo._id)
      // lolosCopy.splice(index, 1)
      // setLolos(lolosCopy)
      setFoundLolos(data)
    } catch (error) {
      console.error(error)
    }
  }
  const updateLolo = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/lolos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      setFoundLolos(data)
      const lolosCopy = [...lolos]
      const index = lolosCopy.findIndex(lolo => id === lolo._id)
      lolosCopy[index] = { ...lolosCopy[index], ...updatedData }
      setLolos(lolosCopy)
    } catch (error) {
      console.error(error)
    }
  }

  const likeLolo = async (id) => {
    try {
      const index = lolos.findIndex((lolo) => lolo._id === id)
      const lolosCopy = [...lolos]
      const subject = lolosCopy[index]
      subject.likes = subject.likes + 1
      const response = await fetch(`/api/lolos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedLolo = await response.json()
      const completedLolosCopy = [updatedLolo, ...lolos]

      setLolos(completedLolosCopy)
      // lolosCopy.splice(index, 1)
      setLolos(lolosCopy)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLolos()
  }, [foundLolos])

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
    setLolo({
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
                  <img variant="top" src={url} alt='uploaded lolo' id="uploadedlolo" style={{ 'width': 90, "borderRadius": "5%" }}></img>
                </div>
              )}
            </span>

            <select
              options={lolo.category}
              value={lolo.category}
              onChange={handleChange}
              defaultValue={"placeholder"}
              name="category"
            >
              <option className= 'optionOne' value={"placeholder"}>Choose Medium</option>
              <option value="Paint">Paint</option>
              <option value="Markers">Markers</option>
              <option value="Crayons">Crayons</option>
              <option value="Mixed">Mixed</option>
              <option value="Schoolwork">Schoolwork</option>
            </select>

            <input
              value={lolo.alt}
              onChange={handleChange}
              name="alt"
              placeholder='Caption:'>
            </input>
            <button onClick={() => createLolo()}>Add to Gallery</button>
          </div>
        </div>
        <hr></hr>
        <div style={{display:"grid"}}>
          {lolos && lolos.length ? (
            <div className='collumns'>
              {lolos.map((lolo) => {
                return (
                  <>
                    <div style={{ "display": "flex", "flexWrap": "wrap" }}>
                      <div key={lolo.id} className={setClass(lolo, styles)} >
                        <img style={{ "borderRadius": "5%", "objectFit": "contain", "width": "100%", "height": "15vw" }} src={lolo.link} alt={lolo.alt} />
                     
                      <p onClick={() => setShowInput(!showInput)}>{lolo.alt}. Posted on {new Date(lolo.createdAt).toLocaleDateString()}.

                        <input
                          ref={inputRef}
                          style={{ display: showInput ? 'block' : 'none' }}
                          type='text'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              //const alt = inputRef.current.value
                              updateLolo(lolo._id, { alt: e.target.value })
                              setShowInput(false)
                            }
                          }}
                          defaultValue={lolo.alt}
                        />
                      </p>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeLolo(lolo._id)}> {lolo.likes}💜</button>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => deleteLolo(lolo._id)}>🗑️</button>
                    </div>
                     </div>
                  </>
                )
              }
              )}
            </div>)
            :
            <> No Entries yet! Yet Add One Below this message </>
          }
        </div>
      </div>
    </>
  )
}