import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { color } from "@cloudinary/url-gen/qualifiers/background";


export default function Bar(props) {
  return (
    <>
    <Navbar  className="navbar-left" bg="light" variant="light" width='100%'>
      <Container >
    <Nav >
    {/* 🧚🏿‍♀️🧚🏻 &nbsp; */}
      <Link to="/lolos">
        {/* <h1>Lolo</h1> */}
      </Link>
      {/* &nbsp; 🦗 &nbsp; */}
      <Link to="/frankys">
        {/* <h1>Franky</h1> */}
      </Link>
    {/*  &nbsp;  🦄🦄 &nbsp; */}
      <Link to="/saylors">
      {/* <h1>Saylor</h1> */}
      </Link>
      {/* &nbsp;  🤡🤡 &nbsp; */}
      <Link to="/vibes">
        {/* <h1>Vibe</h1> */}
      </Link>
      
 &nbsp;  🧞‍♂️🧜🏿‍♀️ &nbsp;
</Nav>
</Container>
</Navbar>
</>
  );
}