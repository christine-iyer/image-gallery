export default function Text(){
     return(
          <>
             <textarea
            value={vibe.text}
            onChange={handleChange}
            // name="textarea"
            rows={8}
            cols={100}
            style={{ borderRadius: '5%', outline: 'dotted', color: 'pink' }}
            placeholder='Some meaningful text'>
          </textarea>
          </>
     )
}