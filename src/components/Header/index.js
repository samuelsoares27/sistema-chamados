import './header.css'
import avatar from '../../assets/avatar.png'
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import {
  Button,
  Offcanvas,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container
} from 'react-bootstrap'


export default function Header() {
  const [show, setShow] = useState(false);

  const { signOut,user } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/" className='tituloNav'>Sistema de Chamados</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <div className="divFoto">
                    <img src={user.avatarUrl === null ? avatar : user.avatarUrl}
                      alt="Minha foto de perfil" className="foto"/>
                  </div>
                  <Link to="/dashboard">
                    <Button variant="primary" className='btnMenu'>
                      <FiHome color="#fff" size={24} className='icones'/>
                      <label className='labelBotao'>Chamados</label>
                    </Button>                   
                  </Link>
                  <Link to="/customers">
                    <Button variant="primary" className='btnMenu'>
                      <FiUser color="#fff" size={24} className='icones'/>
                      <label className='labelBotao'>Clientes</label>
                    </Button>                    
                  </Link>
                  <Link to="/profile">
                    <Button variant="primary" className='btnMenu'>
                      <FiSettings color="#fff" size={24} className='icones'/>
                      <label className='labelBotao'>Configurações</label>
                    </Button>
                  </Link>   
                  
                  <Button variant="danger" onClick={() => signOut()} className='btnMenu'>Sair</Button>
                </Nav>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

