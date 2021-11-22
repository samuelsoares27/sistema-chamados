import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function fazerLogin(e) {
    e.preventDefault();
    alert('teste')
  }

  return (
    <Container className="containerLogin">
      <Row>  
        <Col md={{ span: 8, offset: 2 }}>
          <div className="divLogo">
            <img className="logo" src={logo} alt="Sistema Logo" />
          </div>
          <Form onSubmit={fazerLogin}>
            <h2 className="titulo">Acessar o Sistema</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@email.com"
                value={email}
                onChange={() => setEmail(email)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="*********"
                value={password}
                onChange={()=> setPassword(password)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btnAcessar" >
              Acessar
            </Button >
            <Link to="/register" className="LinkRegister"> Criar uma conta</Link>
          </Form>
        </Col>
      </Row> 
    </Container>
  );
}

export default SignIn;
