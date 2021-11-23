import './signup.css'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth'
  
function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  async function criaConta(e) {
    e.preventDefault();

    if (nome !== '' && email !== '' && password !== '') {
     signUp(email, password, nome);  
    }

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
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

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
              { loadingAuth ? 'Carregando...' : 'Cadastrar' }
            </Button >
            <Link to="/" className="LinkRegister">Já tem uma conta? Entre</Link>
          </Form>
        </Col>
      </Row> 
    </Container>
  );
}

export default SignUp;
