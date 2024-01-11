export default function Author(){
     return(
          <>
                    <label>
        Text <input name="myInput" type='text'value={title} onChange={e=> setTitle(e.target.value)} />
      </label>
       <div>
          <h1>Author</h1>
      </div> 
          </>

     )
}