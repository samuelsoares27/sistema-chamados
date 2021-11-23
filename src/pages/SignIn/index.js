import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth'

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, loadingAuth} = useContext(AuthContext);

  function fazerLogin(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email, password);  
    }
    
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btnAcessar" >
              {loadingAuth ? 'Carregando...' : 'Acessar'}
            </Button >
            <Link to="/register" className="LinkRegister">Criar uma conta</Link>
          </Form>
        </Col>
      </Row> 
    </Container>
  );
}

export default SignIn;
