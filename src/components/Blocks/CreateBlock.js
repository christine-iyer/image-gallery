export default function CreateBlock({block, handleChange, createBlock}){
  return(
    <>
    <input
            type='text'
            value={block.title}
            onChange={handleChange}
            name="title"
            placeholder='Title'
          >
          </input>
          <br />
          <input
            value={block.author}
            onChange={handleChange}
            name="author"
            placeholder='Author'>
          </input>
          <br />
          <textarea
            value={block.text}
            onChange={handleChange}
            // name="textarea"
            rows={8}
            cols={100}
            style={{ borderRadius: '5%', outline: 'dotted', color: 'pink' }}
            placeholder='Some meaningful text'>
          </textarea>
          <br />
          <select
            value={block.category}
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
          <button onClick={() => createBlock()}>Display your Entry</button>
      
    
    </>
  )
}