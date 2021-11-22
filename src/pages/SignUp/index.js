import './signup.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function criaConta(e) {
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
          <Form onSubmit={criaConta}>
            <h2 className="titulo">Cadastre sua Conta</h2>

              <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="fulano da silva"
                value={nome}
                onChange={() => setNome(nome)}
              />
            </Form.Group>

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
              Cadastrar
            </Button >
            <Link to="/" className="LinkRegister">Já tem uma conta? Entre</Link>
          </Form>
        </Col>
      </Row> 
    </Container>
  );
}

export default SignUp;
