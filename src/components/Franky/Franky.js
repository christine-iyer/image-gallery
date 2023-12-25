import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from '../Image/UploadWidget';
import { Container } from 'react-bootstrap';
import { border } from '@cloudinary/url-gen/qualifiers/background';

import '../../App.css';

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Franky() {
  const [foundFrankys, setFoundFrankys] = useState(null)
  const [frankys, setFrankys] = useState([])
  const [franky, setFranky] = useState({
    title: '',
    author: '',
    category: '',
    text: '',
    image: '',
    like: 0
  })
  const [showInput, setShowInput] = useState(false)
  const [url, updateUrl] = useState(false);
  const [error, updateError] = useState();
  const inputRef = useRef(null)
  const handleChange = (evt) => {
    setFranky({ ...franky, [evt.target.name]: evt.target.value })
  }
  const getFrankys = async () => {
    try {
      const response = await fetch('/api/frankys')
      const data = await response.json()
      setFrankys(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createFranky = async () => {
    try {
      const response = await fetch('/api/frankys', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...franky })
      })
      const data = await response.json()
      setFoundFrankys(data)
      setFranky({
        title: '',
        author: '',
        category: '',
        text: '',
        image: '',
        like: 0
      })
    } catch (error) {
      console.error(error)
    }
  }

const deleteFranky = async (id) => {
    try {
      const response = await fetch(`/api/frankys/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      setFoundFrankys(data)
    } catch (error) {
      console.error(error)
    }
  }
  const updateFranky = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/frankys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      setFoundFrankys(data)
      const frankysCopy = [...frankys]
      const index = frankysCopy.findIndex(franky => id === franky._id)
      frankysCopy[index] = { ...frankysCopy[index], ...updatedData }
      setFrankys(frankysCopy)
    } catch (error) {
      console.error(error)
    }
  }

  const likeFranky = async (id) => {
    try {
      const index = frankys.findIndex((franky) => franky._id === id)
      const frankysCopy = [...frankys]
      const subject = frankysCopy[index]
      subject.like = subject.like + 1
      const response = await fetch(`/api/frankys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedFranky = await response.json()
      const completedFrankysCopy = [updatedFranky, ...frankys]

      setFrankys(completedFrankysCopy)
      // frankysCopy.splice(index, 1)
      setFrankys(frankysCopy)

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getFrankys()
  }, [foundFrankys])

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
    setFranky({
      title: '',
      author: '',
      category: '',
      text: '',
      image: result?.info?.secure_url,
      like: 0
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
                  <button style={{ "backgroundColor": 'rgba(162, 134, 109, 0.5)' , 'marginBottom': "9px"}} onClick={handleOnClick}><MDBIcon fab icon='instagram' size='xxl' /></button>
                )
              }}
            </UploadWidget>
            {error && <p>{error}</p>}
            {url && (
           <div key={url._id} className='card' style={{ width: '8rem', 'marginBottom': '1px', 'backgroundColor': 'red' }}>
                <img variant="top" src={url} alt='uploaded image' id="uploadedimage" style={{ 'width': 90, "borderRadius": "5%" }}></img>
                {/* <p style={{ 'fontSize': '6px' }} className="url">{url}</p> */}
              </div>
            )}
          </span>

          <br></br>
          <input
            type='text'
            value={franky.title}
            onChange={handleChange}
            name="title"
            placeholder='Title'
          >
          </input>
          <br />
          <input
            value={franky.author}
            onChange={handleChange}
            name="author"
            placeholder='Author'>
          </input>
          <br />
          <input
            value={franky.text}
            onChange={handleChange}
            name="text"
            rows={2}
            placeholder='Some meaningful text'>
          </input>
          <br />
          <select
            value={franky.category}
            onChange={handleChange}
            name="category">
            <option value="🤍 Frankly Franky">Select a 🤍</option>
            <option value="💛 Janky Franky">💛 Janky Franky</option>
            <option value="🧡 Franky Panky">🧡 Franky Panky</option>
            <option value="💚 Cranky Franky">💚 Cranky Franky</option>
            <option value="💙 Franky 🌙">💙 Franky 🌙</option>
            <option value="💜 Swanky Franky">💜 Swanky Franky</option>
            <option value="❤️ C'est la vie, Franky!">❤️ C'est la vie, Franky!</option>
          </select>
          <br />
          <br />
          <button onClick={() => createFranky()}>Display your Entry</button>
        </div>
      </section>
      <hr></hr>
      {frankys && frankys.length ? (
        <Container className='collumns'>
          {frankys.map((franky) => {
            return (
              <MDBCard key={franky._id} className="w-75 p-3">
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    <MDBCardImage style={{ "maxWidth": "100%", "height": "15vw" }} src={franky.image} alt='...' fluid />
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle>{franky.title}</MDBCardTitle>
                      <MDBCardText onClick={() => setShowInput(!showInput)}>{franky.text}
                        <input
                          ref={inputRef}
                          style={{ display: showInput ? 'block' : 'none' }}
                          type='text'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              // const text = inputRef.current.value
                              updateFranky(franky._id, { text: e.target.value })
                              setShowInput(false)
                            }
                          }}
                          defaultValue={franky.text}
                        />
                      </MDBCardText>
                      <MDBCardText>
                        <small className='text-muted'>
                          {franky.author} posted on {new Date(franky.createdAt).toLocaleDateString()}
                        </small>
                      </MDBCardText>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeFranky(franky._id)}> {franky.like} {franky.category}</button>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>

            )
          }
          )
          }
        </Container>) : <>No Entries yet! Yet Add One Below this message</>
      }
    </>

  )
}