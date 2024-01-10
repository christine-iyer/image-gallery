import Block from './Block'
export default function BlockList({}){
     return(
          {vibes && vibes.length ? (
               <Container className='collumns'>
                 {vibes.map((vibe) => {
                   return (
                    
<ul>
<li><Block /></li>
</ul>
              
                   )
                 }
                 )
                 }
               </Container>) : <>Let's Create Some Vibes</>
             }

     )
}