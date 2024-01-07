
export default function CreateBlock ({
  createBlock,
  block,
  handleChange
}
) {
  return (
    <div >
      <h2 >Create A Block</h2>
      <div >
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            createBlock()
          }}
        >
          
          <label>Title
            <input 
            type='text' 
            value={block.title} 
            name='title' 
            onChange={handleChange} 
            placeholder='Title' 
            />
          </label>
          <label>Author
            <input 
            type='text' 
            value={block.author} 
            name='author' 
            onChange={handleChange} 
            placeholder='Author' 
            />
          </label>

          <label>Pick a category:
            <select 
            options={block.category} 
            value={block.category} 
            onChange={handleChange} 
            placeholder='Category'
            name="category">
              <option value="Family">Family</option>
              <option  value="Friends">Friends</option>
              <option  value="Work">Work</option>
              <option  value="Code">Code</option>
              <option  value="Misc">Misc</option>
            </select>
            </label>


          <label>Text
            <input 
            type='text' 
            value={block.text} 
            name='text' 
            onChange={handleChange} 
            placeholder='Text' />
          </label>
 <input  
          type='submit' 
          value='Create Block' />
</form>
      </div>
     
    </div>
  )
}
