// export default function Block({}){
//      return(
//           <div>
//                 <MDBCard key={vibe._id} className="w-75 p-3">
//                 <MDBRow className='g-0'>
//                   <MDBCol md='4'>
//                     <MDBCardImage style={{ "maxWidth": "100%", "height": "15vw" }} src={vibe.image} alt='...' fluid />
//                   </MDBCol>
//                   <MDBCol md='8'>
//                     <MDBCardBody>
//                       <MDBCardTitle>{vibe.title}</MDBCardTitle>
//                       <MDBCardText key={vibe.id} onClick={() => setShowInput(!showInput)}>
//                         {readMore ? vibe.text : `${vibe.text.substring(0, 38)}...`}
//                         <button
//                           style={{ color: 'greenyellow' }}
//                           className="btn"
//                           onClick={() => setReadMore(!readMore)}>
//                         </button>
//                         <input
//                           ref={inputRef}
//                           style={{ display: showInput ? 'block' : 'none' }}
//                           type='text'
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               e.preventDefault()
//                               // const text = inputRef.current.value
//                               updateVibe(vibe._id, { text: e.target.value })
//                               setShowInput(false)
//                             }
//                           }}
//                           defaultValue={vibe.text}
//                         />
//                       </MDBCardText>
//                       <MDBCardText>
//                         <small className='text-muted'>
//                           {vibe.author} posted on {new Date(vibe.createdAt).toLocaleDateString()}
//                         </small>
//                       </MDBCardText>
//                       <button style={{ 'fontStyle': 'italic' }} className="btn btn-outline-warning" onClick={() => likeVibe(vibe._id)}>♥️ {vibe.like}</button>
//                       <br></br>
//                       {vibe.category}
//                     </MDBCardBody>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCard>

//           </div>
//      )
// }
import { useRef, useState } from 'react'
import { Carousel } from 'react-bootstrap'

export default function Bookmark ({
  bookmark,
  updateBookmark,
  deleteBookmark
}) {
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef(null)
  return (
    <>
       <li style={{listStyle:'none'}}>
      <h4 onClick={() => setShowInput(!showInput)}>{bookmark.title}</h4>
        <input
          ref={inputRef}
          style={{ display: showInput ? 'block' : 'none' }}
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const title = inputRef.current.value
              updateBookmark(bookmark._id, { title })
              setShowInput(false)
            }
          }}
          defaultValue={bookmark.title}
        /> 
        <Carousel.Item>
        <img style={{ "borderRadius": "5%", "objectFit": "contain", "width": "100%", "height": "15vw" }} src={bookmark.url} alt={bookmark.title} />
       </Carousel.Item>
         <button
          onClick={() => deleteBookmark(bookmark._id)}
        >
          Delete Me
        </button> 
      </li>
    </>
  )
}