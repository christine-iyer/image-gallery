import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from '../Image/UploadWidget';
import {Container, Row, Col} from 'react-bootstrap';
import './style.css'
const paragraphStyles = {
  WebKitLineClamp:1, 
  WebKitBoxOrient: 'horizontal', 
  overflow: 'hidden', 
  display: '-webkit-box'
}

export default function Time() {
  const [times, setTimes] = useState([])
  const [foundTime, setFoundTime] = useState(null)
  const [time, setTime] = useState({
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
    setTime({ ...time, [evt.target.name]: evt.target.value })
  }


  // index
  const getTimes = async () => {
    try {
      const response = await fetch('/api/times')
      const data = await response.json()
      setTimes(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteTime = async (id) => {
    try {
      const response = await fetch(`/api/times/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundTime(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateTime = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/times/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      const timesCopy = [...times]
      const index = timesCopy.findIndex(time => id === time._id)
      timesCopy[index] = { ...timesCopy[index], ...updatedData }
      setTimes(timesCopy)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createTime = async () => {
    try {
      const response = await fetch(`/api/times`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...time })
      })
      const data = await response.json()
      setFoundTime(data)
      setTime({
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
    getTimes()
  }, [foundTime])

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
    setTime({
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

      {'New Time Name'}
      <input
        value={time.title}
        onChange={handleChange}
        name="title">
      </input>
      <br />
      {'Author '}
      <input
        value={time.author}
        onChange={handleChange}
        name="author">
      </input>
      <br />
      {'Text '}
      <input
        value={time.text}
        onChange={handleChange}
        name="text">
      </input>
      <br />
      {'Category '}
      <select
        value={time.category}
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

<button onClick={() => createTime()}>READY TO SEE YOUR Time</button>
</section>

      {

        times && times.length ? (
        <Container className='collumns'>
           <Row>
            <Col xs={4} md={6}>

          
          {
            times.map((time) => {
              return (
                <div className='collumn' key={time._id}>
                  
                  <div className="head">
              <span className="headline hl1">{time.title}</span>
              <span>{new Date(time.createdAt).toLocaleDateString()}</span>
              <p>
                <span className="headline hl2">by {time.author}</span>
              </p>
              <q>{time.text.split('. ', 1)[0]}</q>
            </div>
            <figure className="figure">
              <img className="media" src={time.image} alt="" />
              <figcaption className="figcaption">{time.category}</figcaption>
            </figure>
            <p style={isOpen ? null : paragraphStyles} ref = {ref}>{time.text} <span className="citation"></span></p>
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