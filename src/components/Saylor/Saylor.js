import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import setClass from './../../utilities/category-class'
// import '../App.css'
import styles from './Saylor.module.scss'
import image from '../../../models/lolo';


export default function Saylor() {
  const [foundSaylors, setFoundSaylors] = useState(null)
  const [saylors, setSaylors] = useState([])
  const [saylor, setSaylor] = useState({
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
    setSaylor({ ...saylor, [evt.target.name]: evt.target.value })
  }



  const getSaylors = async () => {
    try {
      const response = await fetch('/api/saylors')
      const data = await response.json()
      setSaylors(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createSaylor = async () => {
    try {
      const response = await fetch('/api/saylors', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...saylor })
      })
      const data = await response.json()
      setFoundSaylors(data)
      setSaylor({
        link: '',
        alt: '',
        category: '',
        likes: 0
      })
   
    } catch (error) {
      console.error(error)
    }
  }

  const deleteSaylor = async (id) => {
    try {
      const response = await fetch(`/api/saylors/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      // const saylorsCopy = [...saylors]
      // const index = saylorsCopy.findIndex(saylor => id === saylor._id)
      // saylorsCopy.splice(index, 1)
      // setSaylors(saylorsCopy)
      setFoundSaylors(data)
    } catch (error) {
      console.error(error)
    }
  }
  const updateSaylor = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/saylors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      setFoundSaylors(data)
      const saylorsCopy = [...saylors]
      const index = saylorsCopy.findIndex(saylor => id === saylor._id)
      saylorsCopy[index] = { ...saylorsCopy[index], ...updatedData }
      setSaylors(saylorsCopy)
    } catch (error) {
      console.error(error)
    }
  }

  const likeSaylor = async (id) => {
    try {
      const index = saylors.findIndex((saylor) => saylor._id === id)
      const saylorsCopy = [...saylors]
      const subject = saylorsCopy[index]
      subject.likes = subject.likes + 1
      const response = await fetch(`/api/saylors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedSaylor = await response.json()
      const completedSaylorsCopy = [updatedSaylor, ...saylors]

      setSaylors(completedSaylorsCopy)
      // saylorsCopy.splice(index, 1)
      setSaylors(saylorsCopy)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSaylors()
  }, [foundSaylors])

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
    setSaylor({
      link: result?.info?.secure_url,
      alt: '',
      likes: 0
    })
    
  }
  return (
    <>
      <div className='canvas'>
        <h1>Saylors's Blog</h1>
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
                  <img variant="top" src={url} alt='uploaded saylor' id="uploadedsaylor" style={{ 'width': 90, "borderRadius": "5%" }}></img>
                </div>
              )}
            </span>

            <select
              options={saylor.category}
              value={saylor.category}
              onChange={handleChange}
              defaultValue={"placeholder"}
              name="category"
            >
              <option className= 'optionOne' value={"placeholder"}>Choose Tag</option>
              <option value="Paintings">Paintings</option>
              <option value="Songs">Songs</option>
              <option value="Animals">Animals</option>
              <option value="School">School</option>
              <option value="Dance">Dance</option>
            </select>

            <input
              value={saylor.alt}
              onChange={handleChange}
              name="alt"
              placeholder='Caption:'>
            </input>
            <button onClick={() => createSaylor()}>Add to Gallery</button>
          </div>
        </div>
        <hr></hr>
        <div style={{display:"grid"}}>
          {saylors && saylors.length ? (
            <div className='collumns'>
              {saylors.map((saylor) => {
                return (
                  <>
                    <div style={{ "display": "flex", "flexWrap": "wrap" }}>
                      <div key={saylor.id} className={setClass(image, styles)} >
                        <img style={{ "borderRadius": "5%", "objectFit": "contain", "width": "100%", "height": "15vw" }} src={saylor.link} alt={saylor.alt} />
                     
                      <p onClick={() => setShowInput(!showInput)}>{saylor.alt}. Posted on {new Date(saylor.createdAt).toLocaleDateString()}.

                        <input
                          ref={inputRef}
                          style={{ display: showInput ? 'block' : 'none' }}
                          type='text'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              //const alt = inputRef.current.value
                              updateSaylor(saylor._id, { alt: e.target.value })
                              setShowInput(false)
                            }
                          }}
                          defaultValue={saylor.alt}
                        />
                      </p>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeSaylor(saylor._id)}> {saylor.likes}💜</button>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => deleteSaylor(saylor._id)}>🗑️</button>
                    </div>
                     </div>
                  </>
                )
              }
              )}
            </div>)
            :
            <> No Saylor entries yet! Yet Add One Below.</>
          }
        </div>
      </div>
    </>
  )
}