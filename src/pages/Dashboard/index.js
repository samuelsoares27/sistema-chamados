import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from '../../services/firebaseConnection'
import Header from '../../components/Header'
import Title from "../../components/Title";
import './dashboard.css'
import { toast } from "react-toastify";

const listRef = firebase.firestore().collection('services').orderBy('data', 'desc');
export default function Dashboard() {
    
    const [chamados, setChamados] = useState([]);
    
    useEffect(() => {
        
        async function loadChamados() {
            await listRef.limit(5)
                .get()
                .then((snapshot) => {
                    updateState(snapshot);
                }).catch(() => {
                    toast.error('Ops, algo aconteceu na busca dos chamados');
                })
        }
        loadChamados();
    }, [])
    
    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;
        let lista = [];

        snapshot.forEach((chamado, index) => {
            lista.push({
                id: index,
                cliente: chamado.data().cliente.nome,
                assunto: chamado.data().assunto,
                status: chamado.data().status,
                data: chamado.data().data
            })
        })
        setChamados(lista);
    }

    return (
        <div>
            <Header/>
            <Container>
                <Row className="divProfile">
                    <Col md="12" >
                        <Title name="Chamados">
                            <FiMessageSquare color="#000" size={25} />
                        </Title>
                    </Col>
                    <Col md="12">
                        <Link to="/newservices" className="botaoNovoChamado">
                            <Button variant="success">
                                <FiPlus size={25} color="#fff" />
                                Novo Chamado
                            </Button>
                        </Link>
                        
                    </Col>
                    <Col md="12" className="tableChamados">
                       <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>Codigo</th>
                                <th>Cliente</th>
                                <th>Assunto</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th className="text-center">#</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                chamados.map((chamado) => {
                                    return (
                                        <tr key={chamado.id}>
                                            <td>{chamado.id}</td>
                                            <td>{chamado.cliente}</td>
                                            <td>{chamado.assunto}</td>
                                            <td>{chamado.status}</td>
                                            <td>{chamado.data}</td>
                                            <td className="text-center">
                                                <Button variant="warning" className="botoesAcaoChamado">
                                                    <FiMessageSquare color="#000" size={15} className="iconeAcaoChamado"/>
                                                </Button>
                                                <Button variant="danger" className="botoesAcaoChamado">
                                                    <FiMessageSquare color="#000" size={15} className="iconeAcaoChamado"/>
                                                </Button>
                                            </td>
                                        </tr> 
                                    ); 
                                })    
                            }
                            </tbody>
                       </Table> 
                    </Col>
                </Row>
            </Container>
        </div>
    );
}