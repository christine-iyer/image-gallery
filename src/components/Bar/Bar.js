import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Lolo from '../Images/lolo.jpg'
import Saylor from '../Images/saylor.PNG'
import Times from '../Images/times.png'
import Vibes from '../Images/vibes.png'


export default function Bar(props) {
  return (
    <>
    <Navbar  className="navbar-left" bg="light" variant="light" width='100%'>
      <Container >
    <Nav >
    {/* 🏠🏠 &nbsp;
      <Link to="/">
        <h1>🏠</h1>
      </Link>
    🧚🏿‍♀️🧚🏻 &nbsp;
      <Link to="/lolos">
        <h1>Lolo</h1>
      </Link>
      &nbsp; 🦗 &nbsp;
      <Link to="/times">
        <h1>Headlines</h1>
      </Link>
     &nbsp;  🦄🦄 &nbsp;
      <Link to="/saylors">
      <h1>Saylor</h1>
      </Link>
      &nbsp;  🤡🤡 &nbsp;
      <Link to="/vibes">
        <h1>Vibe</h1>
      </Link>
      
 &nbsp;🧞‍♂️🧜🏿‍♀️🧞 &nbsp; */}
  
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
</Nav>
</Container>
</Navbar>
</>
  );
}