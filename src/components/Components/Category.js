export default function Category({}) {
     return (
          <>
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
          </>
     )
}