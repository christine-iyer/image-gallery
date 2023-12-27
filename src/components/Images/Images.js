import Lolo from './lolo.jpg'
import Saylor from './saylor.PNG'
import Times from './times.png'
import Vibes from './vibes.png'
import { Link } from 'react-router-dom';
import styles from './Images.module.scss'
export default function Images(){
     return(
          <div>
          <Link to="/lolos" target="_blank" rel="noreferrer">
            <img src={Lolo} alt='lolo'></img>
          </Link>
          <Link to="/saylors" target="_blank" rel="noreferrer">
            <img src={Saylor} alt='saylor'></img>
          </Link>
          <Link to="/times" target="_blank" rel="noreferrer">
            <img src={Times} alt='times'></img>
          </Link>
          <Link to="/vibes" target="_blank" rel="noreferrer">
            <img src={Vibes} alt='vibin'></img>
          </Link>
        </div>




          // <>
          // <img src={Lolo} alt='lolo'  />
          // <img src={Saylor} alt='lolo'  />
          // <img src={Times} alt='times'  />
          // <img src={Vibes} alt='vibin'  />
          // </>
     )
}