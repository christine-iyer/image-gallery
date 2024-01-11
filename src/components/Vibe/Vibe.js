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

export default function Vibe() {
  const [vibes, setVibes] = useState([])
  const [foundVibes, setFoundVibes] = useState(null)
  const [vibe, setVibe] = useState({
    title: '',
    author: '',
    category: '',
    text: '',
    image: '',
    like: 0
  })

  const [readMore, setReadMore] = useState(false);
  const [showInput, setShowInput] = useState(false)
  const [url, updateUrl] = useState(false);
  const [error, updateError] = useState();
  const inputRef = useRef(null)
  const handleChange = (evt) => {
    setVibe({ ...vibe, [evt.target.name]: evt.target.value })
  }
  const getVibes = async () => {
    try {
      const response = await fetch('/api/vibes')
      const data = await response.json()
      setVibes(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createVibe = async () => {
    try {
      const response = await fetch('/api/vibes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...vibe })
      })
      const data = await response.json()
      setFoundVibes(data)
      setVibe({
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


  const deleteVibe = async (id) => {
    try {
      const response = await fetch(`/api/vibes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      setFoundVibes(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateVibe = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/vibes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      setFoundVibes(data)
      const vibesCopy = [...vibes]
      const index = vibesCopy.findIndex(vibe => id === vibe._id)
      vibesCopy[index] = { ...vibesCopy[index], ...updatedData }
      setVibes(vibesCopy)
    } catch (error) {
      console.error(error)
    }
  }

  const likeVibe = async (id) => {
    try {
      const index = vibes.findIndex((vibe) => vibe._id === id)
      const vibesCopy = [...vibes]
      const subject = vibesCopy[index]
      subject.like = subject.like + 1
      const response = await fetch(`/api/vibes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedVibe = await response.json()
      const completedVibesCopy = [updatedVibe, ...vibes]

      setVibes(completedVibesCopy)
      // vibesCopy.splice(index, 1)
      setVibes(vibesCopy)

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getVibes()
  }, [foundVibes])

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
    setVibe({
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
                  <button style={{ "backgroundColor": 'rgba(162, 134, 109, 0.5)', 'marginBottom': "9px" }} onClick={handleOnClick}><MDBIcon fab icon='instagram' size='xxl' /></button>
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
            value={vibe.title}
            onChange={handleChange}
            name="title"
            placeholder='Title'
          >
          </input>
          <br />
          <input
            value={vibe.author}
            onChange={handleChange}
            name="author"
            placeholder='Author'>
          </input>
          <br />
          <textarea
            value={vibe.text}
            onChange={handleChange}
            // name="textarea"
            rows={8}
            cols={100}
            style={{ borderRadius: '5%', outline: 'dotted', color: 'pink' }}
            placeholder='Some meaningful text'>
          </textarea>
          <br />
          <select
            value={vibe.category}
            onChange={handleChange}
            name="category">
            <option value="Misc">Select a 🤍</option>
            <option value="#Beer">#Beer</option>
            <option value="#Weed">#Weed</option>
            <option value="#Bars">#Bars</option>
            <option value="#Outdoors">#Outdoors</option>
            <option value="#Kids">#Kids</option>
            <option value="#Indoors">#Indoors</option>
          </select>
          <br />
          <br />
          <button onClick={() => createVibe()}>Display your Entry</button>
        </div>
      </section>
      <hr></hr>
      {vibes && vibes.length ? (
        <Container className='collumns'>
          {vibes.map((vibe) => {
            return (
              <MDBCard key={vibe._id} className="w-75 p-3">
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    <MDBCardImage style={{ "maxWidth": "100%", "height": "15vw" }} src={vibe.image} alt='...' fluid />
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle>{vibe.title}</MDBCardTitle>
                      <MDBCardText key='id' onClick={() => setShowInput(!showInput)}>
                        {readMore ? vibe.text : `${vibe.text.substring(0, 38)}...`}
                        <button
                          style={{ color: 'greenyellow' }}
                          className="btn"
                          onClick={() => setReadMore(!readMore)}>
                        </button>
                        <input
                          ref={inputRef}
                          style={{ display: showInput ? 'block' : 'none' }}
                          type='text'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              // const text = inputRef.current.value
                              updateVibe(vibe._id, { text: e.target.value })
                              setShowInput(false)
                            }
                          }}
                          defaultValue={vibe.text}
                        />
                      </MDBCardText>
                      <MDBCardText>
                        <small className='text-muted'>
                          {vibe.author} posted on {new Date(vibe.createdAt).toLocaleDateString()}
                        </small>
                      </MDBCardText>
                      <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeVibe(vibe._id)}>♥️ {vibe.like}</button>
                      <br></br>
                      {vibe.category}
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            )
          }
          )
          }
        </Container>) : <>Let's Create Some Vibes</>
      }
    </>
  )
}