import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiPlus, FiEdit2, FiSearch } from "react-icons/fi";
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
    const [detalhes, setDetalhes] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                    dataFormated: format(doc.data().data.toDate(), 'dd/MM/yyyy'),
                    observacao: doc.data().observacao
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

    function openModal(chamado) {
        setDetalhes(chamado);
        handleShow();
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
                                <tr className="text-center">
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
                                        <tr key={index} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>{chamado.cliente.nome}</td>
                                            <td>{chamado.assunto}</td>
                                            <td>{
                                                chamado.status === 'Aberto' &&
                                                <span className="statusAberto">{chamado.status}</span>
                                            }{
                                                chamado.status === 'Andamento' &&
                                                <span className="statusAndamento text-center">{chamado.status}</span>
                                            }{
                                                chamado.status === 'Fechado' &&
                                                <span className="statusFechado text-center">{chamado.status}</span>                                                
                                            }
                                            </td>
                                            <td>{chamado.dataFormated}</td>
                                            <td className="text-center">
                                                <Link to={`/newservices/${chamado.id}`}> 
                                                    <Button variant="warning" className="botoesAcaoChamado">
                                                        <FiEdit2 color="#000" size={15} className="iconeAcaoChamado"/>
                                                    </Button>
                                                </Link>
                                                <Button variant="danger" className="botoesAcaoChamado" onClick={() => openModal(chamado)}>
                                                    <FiSearch color="#000" size={15} className="iconeAcaoChamado"/>
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
            <Modal show={ show } onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title><strong>Detalhes do chamado</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md="12">
                                <strong>Assunto:</strong><i> {detalhes !== null? detalhes.assunto : ''}</i>
                            </Col>
                            <Col md="12"><br/></Col>
                            <Col md="12">
                                <strong>Cliente: </strong><i> {detalhes !== null? detalhes.cliente.nome : ''}</i>
                            </Col> 
                            <Col md="12"><br/></Col>
                            <Col md="12">
                                <Row>
                                    <Col md="4">
                                        <strong>Status: </strong>                 
                                        {
                                            detalhes !== null && detalhes.status === 'Aberto' ?
                                                <span className="statusAberto"><i className="labelStatusAberto">{detalhes.status}</i></span> : ''
                                        }{
                                            detalhes !== null && detalhes.status === 'Andamento' ?
                                                <span className="statusAndamento"><i className="labelStatusAndamento">{detalhes.status}</i></span> : ''
                                        }{
                                            detalhes !== null && detalhes.status === 'Fechado' ?
                                                <span className="statusFechado"><i className="labelStatusFechado">{detalhes.status}</i></span> : ''                                                               
                                        }
                                    </Col>
                                    <Col md="8">
                                        <strong>Data: </strong><i>{detalhes !== null? detalhes.dataFormated : ''} </i> 
                                    </Col> 
                                </Row>
                            </Col> 
                            <Col md="12"><br/></Col> 
                            <Col md="12">
                               <strong>Observacao: </strong><br/><i> {detalhes !== null? detalhes.observacao : ''}</i> 
                            </Col>                             
                        </Row>       
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}