import { useState } from "react"
export default function Title(){
     const [title, setTitle] = useState('Hi')
     return(
          <>
          <label>
        Text <input name="myInput" type='text'value={title} onChange={e=> setTitle(e.target.value)} />
      </label>
       <div>
          <h1>Title</h1>
      </div> 
          </>
     )
}