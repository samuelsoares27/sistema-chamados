import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import firebase from '../../services/firebaseConnection'
import Header from '../../components/Header';
import Title from '../../components/Title';
import './customers.css'

export default function Customers() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleSave(e) {
        e.preventDefault();

        if (nome === '' || email === '' || cpfCnpj === '' || endereco === '') {
            toast.error('Ops, para cadastrar um cliente é necessário preencher todos os campos');        
        } else {
            await firebase.firestore().collection('customers')
            .doc()
            .set({
                nome: nome,
                email: email,
                cpfCnpj: cpfCnpj,
                endereco: endereco
            }).then(() => {
                toast.success('Cliente cadastrado com sucesso!');
                setNome('');
                setEmail('');
                setCpfCnpj('');
                setEndereco('');
            }).catch(() => {
               toast.error('Ops, algo deu errado no cadastro'); 
            })
        }

    }

    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md="12" className="divProfile">
                        <Title name="Clientes">
                            <FiUser color="#000" size={25} />
                        </Title>
                        <Form onSubmit={handleSave} className="formCustomers">
                            <Form.Group className="mb-3" controlId="formBasicNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={ (e) => setNome(e.target.value)} />                              
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} onChange={ (e) => setEmail(e.target.value)} />                              
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCpfCnpj"> 
                                <Form.Label>CPF/CNPJ</Form.Label>
                                <Form.Control type="text" value={cpfCnpj} onChange={ (e) => setCpfCnpj(e.target.value)}/>       
                            </Form.Group>   
                            <Form.Group className="mb-3" controlId="formBasicEndereco"> 
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" value={endereco} onChange={ (e) => setEndereco(e.target.value)}/>       
                            </Form.Group>                             
                            <Button variant="primary" type="submit" className="btnSalvarProfile">
                                Salvar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
       </div>  
    );
}