import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from 'date-fns'
import firebase from '../../services/firebaseConnection'
import Header from '../../components/Header'
import Title from "../../components/Title";
import './dashboard.css'


const listRef = firebase.firestore().collection('services').orderBy('data', 'desc');
export default function Dashboard() {
    
    const [chamados, setChamados] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [docs, setDocs] = useState();
    
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

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    cliente: doc.data().cliente,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    dataFormated: format(doc.data().data.toDate(), 'dd/MM/yyyy')
                })
            })

            setDocs(snapshot.docs[snapshot.docs.length - 1]);
            setChamados(chamados => [...chamados, ...lista]);
        } else {
            setIsEmpty(true);
        }


    }

    async function handleMore() {
        await listRef.startAfter(docs).limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot);
        })
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
                        <div className="divBotaoNovoChamado">
                            <Link to="/newservices" >
                            <Button variant="success">
                                <FiPlus size={25} color="#fff" />
                                Novo Chamado
                            </Button>
                        </Link>
                        </div>
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
                                chamados.map((chamado, index) => {
                                    return (
                                        <tr key={chamado.id}>
                                            <td>{index + 1}</td>
                                            <td>{chamado.cliente.nome}</td>
                                            <td>{chamado.assunto}</td>
                                            <td>{chamado.status}</td>
                                            <td>{chamado.dataFormated}</td>
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
                        { !isEmpty &&
                            <Button onClick={handleMore} className="btnBuscarMais">Buscar mais</Button>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}