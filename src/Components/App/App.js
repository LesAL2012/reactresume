import React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import FooterContainer from '../Footer/FooterContainer';
import ContentContainer from '../Content/ContentConteiner';
import css from './App.module.css';

import {
  Navbar, Nav,
  // NavDropdown 
} from 'react-bootstrap';



function App() {
  return (
    
    <div className='container-fluid p-0' style={{ maxWidth: '1170px' }}>
      
      <div className={css.AppWrapper} >

        <HeaderContainer />

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Brand href="/">Main</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

              <Nav.Link href="/currencyexchange">Currency exchange</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              <Nav.Link href="/weather">Weather</Nav.Link>

              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}

            </Nav>

            {/* <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav> */}

          </Navbar.Collapse>

        </Navbar>

        <ContentContainer />

        <FooterContainer />

      </div >
    </div >
    
  );
}

export default App;
