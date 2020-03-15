import React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import FooterContainer from '../Footer/FooterContainer';
import ContentContainer from '../Content/ContentConteiner';
import LogOutButton from '../LogInOut/LogOutButton';
import NavAdmin from './NavAdmin';
import css from './App.module.css';

import {
  Navbar, Nav,
  NavDropdown
} from 'react-bootstrap';

import { compose } from 'redux';
import { connect } from 'react-redux';


function App(props) {
  return (

    <div className={css.AppWrapper} tyle={{ maxWidth: '1170px', margin: '0 auto' }}  >

      <HeaderContainer />

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className='container' >

          <Navbar.Brand href="/">Main</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

              {
                localStorage.getItem('reactUserLogin')
                  ?
                  <NavDropdown title="Agro" id="collasible-nav-dropdown">



                    <NavDropdown.Item href="/agrodata">Live Agro-Data in CHARTS</NavDropdown.Item>
                    <NavDropdown.Item href="/reportsagromachinery">Report - Readiness of machinery and equipment</NavDropdown.Item>

                    {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavAdmin />

                  </NavDropdown>
                  :
                  <Nav.Link href="/agrodata">AGRO DATA</Nav.Link>
              }

              <Nav.Link href="/currencyexchange">Currency exchange</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              <Nav.Link href="/weather">Weather</Nav.Link>


            </Nav>

            {/* <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav> */}

            <LogOutButton />

          </Navbar.Collapse>
        </div >
      </Navbar>

      <div className={css.content} >
        <ContentContainer />
      </div >

      <div className={css.footer} >
        <FooterContainer />
      </div >

    </div >

  );
}

let mapStateToProps = (state) => {
  return {
    commonData: state.common,
  }
}

export default compose(
  connect(mapStateToProps, {
  }),
)(App);
