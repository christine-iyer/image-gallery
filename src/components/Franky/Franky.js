import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from '../Image/UploadWidget';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import './style.css'
import { border } from '@cloudinary/url-gen/qualifiers/background';
const paragraphStyles = {
  WebKitLineClamp:1, 
  WebKitBoxOrient: 'horizontal', 
  overflow: 'hidden', 
  display: '-webkit-box'
}

export default function Franky() {
  const [frankys, setFrankys] = useState([])
  const [foundFranky, setFoundFranky] = useState(null)
  const [franky, setFranky] = useState({
    title: '',
    author: '',
    category: '',
    text: '',
    image: ''
  })
  const [isOpen, setIsOpen]= useState(false)
  const [showReadMoreButton, setShowReadMoreButton]= useState(false)
  const ref = useRef(null)

  const handleChange = (evt) => {
    setFranky({ ...franky, [evt.target.name]: evt.target.value })
  }


  // index
  const getFrankys = async () => {
    try {
      const response = await fetch('/api/frankys')
      const data = await response.json()
      setFrankys(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteFranky = async (id) => {
    try {
      const response = await fetch(`/api/frankys/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundFranky(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateFranky = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/frankys/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      const frankysCopy = [...frankys]
      const index = frankysCopy.findIndex(franky => id === franky._id)
      frankysCopy[index] = { ...frankysCopy[index], ...updatedData }
      setFrankys(frankysCopy)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createFranky = async () => {
    try {
      const response = await fetch(`/api/frankys`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...franky })
      })
      const data = await response.json()
      setFoundFranky(data)
      setFranky({
        title: '',
        createdDate: '',
        author: '',
        category: '',
        text: '',
        image: ''
      })
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getFrankys()
  }, [foundFranky])

  useEffect(()=> {
    if(ref.current) {
      console.log(ref.current.scrollHeight,ref.current.clientHeight)

      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      )
    }
  },[])


  const [url, updateUrl] = useState(false);
  const [error, updateError] = useState();
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
      image: result?.info?.secure_url

    })
  }

  return (
    <>
    <section>
    <h1>CREATE A NEW BLOG</h1>
      <UploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick}>
              Upload an Image
            </button>
          )
        }}
      </UploadWidget>

      {error && <p>{error}</p>}

      {url && (
        <div key={url._id} className='card' style={{ width: '8rem' }}>
          <img variant="top" src={url} id="uploadedimage"></img>
          <p className="url">{url}</p>
        </div>
      )}

      {'New Franky Name'}
      <input
        value={franky.title}
        onChange={handleChange}
        name="title">
      </input>
      <br />
      {'Author '}
      <input
        value={franky.author}
        onChange={handleChange}
        name="author">
      </input>
      <br />
      {'Text '}
      <input
        value={franky.text}
        onChange={handleChange}
        name="text">
      </input>
      <br />
      {'Category '}
      <select
        value={franky.category}
        onChange={handleChange}
        name="category">
        <option value="Curiousities">Select One ...</option>
        <option value="Curiousities">Curiousities</option>
        <option value="Thoughts">Thoughts</option>
        <option value="ToDos">ToDos</option>
      </select>
      <br />
      {'Image '}
      <input
        value={url}
        onChange={handleChange}
        name="url">
      </input>
      <br />

<button onClick={() => createFranky()}>READY TO SEE YOUR Franky</button>
</section>

      {

        frankys && frankys.length ? (
        <Container className='collumns'>
           <Row>
            <Col xs={4} md={6}>

          
          {
            frankys.map((franky) => {
              return (
                <div className='collumn' key={franky._id}>
                  
                  <div className="head">
              <span className="headline hl1">{franky.title}</span>
              <span>{new Date(franky.createdAt).toLocaleDateString()}</span>
              <p>
                <span className="headline hl2">by {franky.author}</span>
              </p>
              <q>{franky.text.split('. ', 1)[0]}</q>
            </div>
            <figure className="figure">
              <img className="media" src={franky.image} alt="" />
              <figcaption className="figcaption">{franky.category}</figcaption>
            </figure>
            <p style={isOpen ? null : paragraphStyles} ref = {ref}>{franky.text} <span className="citation"></span></p>
            {showReadMoreButton && (
              <button onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ? 'read less...' : 'read more ...'}
              </button>
            )}
          
            
   </div>


                


                
              )
            })
          }
          </Col>
          </Row>

        </Container>) : <>No Expenses Yet Add One Below</>
      }




    </>
  )
}