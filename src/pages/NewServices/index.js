import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FiMessageSquare } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header'
import Title from '../../components/Title'
import firebase from '../../services/firebaseConnection';
import './newServices.css'


export default function NewServices() {

    const { user } = useContext(AuthContext);
    const [clienteSelecionado, setClienteSelecionado] = useState(0);
    const [cliente, setCliente] = useState([]);
    const [assunto, setAssunto] = useState('');
    const [status, setStatus] = useState('Aberto');
    const [observacao, setObservacao] = useState('');
    const [clienteAlterar, setClienteAlterar] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    
    useEffect(() => {
        

        async function loadCliente() {
            await firebase.firestore().collection('customers')
                .get().then((snapshot) => {
                    
                    let lista = [];

                    snapshot.forEach(element => {
                        lista.push({
                            id: element.id,
                            nome: element.data().nome
                        });
                    });

                    if (lista.length === 0) {
                        toast.error('Ops, não existe clientes cadastrados');
                        return;
                    } else {
                        setCliente(lista);
                    }

                    if (id) {
                        loadId(lista);
                    }

                }).catch(() => {
                    toast.error('Erro ao buscar os clientes');
                })
        }
        loadCliente();


    }, [id, loadId])

    async function loadId(lista) {
        await firebase.firestore().collection('services').doc(id).get()
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto);
                setStatus(snapshot.data().status);
                setObservacao(snapshot.data().observacao);

                let index = lista.findIndex(item => item.id === snapshot.data().cliente.id);
                setClienteSelecionado(index);
                setClienteAlterar(true);
            }).catch(() => {
                toast.error('Ops, algo deu errado na edição');
                setClienteAlterar(false);
            })
    }

    async function handleSave(e) {
        e.preventDefault();

        if (status === '' || assunto === '' || observacao === '') {
            toast.error('Ops, é necessário preencher todos os campos');
            return;
        } else {

            if (!clienteAlterar) {
                await firebase.firestore().collection('services')
                .add({
                    cliente: cliente[clienteSelecionado],
                    assunto: assunto,
                    status: status,
                    observacao: observacao,
                    data: new Date(),
                    user: user
                }).then(() => {
                    toast.success('Chamado cadastrado com sucesso!');
                    setClienteSelecionado(0);
                    setAssunto('');
                    setStatus('Aberto');
                    setObservacao('');
                    
                }).catch(() => {
                    toast.error('Ops, algo deu errado');
                })
            } else {
                await firebase.firestore().collection('services').doc(id)
                .update({
                    cliente: cliente[clienteSelecionado],
                    assunto: assunto,
                    status: status,
                    observacao: observacao,
                    user: user
                }).then(() => {
                    toast.success('Alterado com Sucesso!');
                    setClienteSelecionado(0);
                    setAssunto('');
                    setStatus('Aberto');
                    setObservacao('');
                    setClienteAlterar(false);
                    history.push('/dashboard',); 
                    
                }).catch(() => {
                    toast.error('Ops, algo deu errado');
                })
            }
                return;

        }

    }

    return (
        <div>
            <Header />
            <Container>            
                <Row>
                    <Col md="12" className='divProfile'>
                        <Title name="Novo Chamado">
                            <FiMessageSquare color="#000" size={25} />
                        </Title>
                        <Form onSubmit={handleSave} className="formServices">
                            <Form.Group className="mb-3" controlId="formBasicCliente">
                                <Form.Label>Cliente</Form.Label>
                                {
                                    cliente.length === 0 ? (
                                        <Form.Control type="text" value={"Carregando clientes..."}  disabled={true}/>  
                                    )
                                    : (
                                    <Form.Select value={clienteSelecionado}
                                        onChange={(e) => setClienteSelecionado(e.target.value)}>
                                    {
                                            cliente.map((cliente, index) => {
                                            return (
                                                <option
                                                    value={index}
                                                    key={cliente.id}>{cliente.nome}
                                                </option>
                                            )
                                        })        
                                    }
                                    </Form.Select>                                             
                                   )
                                }
                    
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Assunto</Form.Label>
                                <Form.Control type="text" value={assunto} onChange={ (e) => setAssunto(e.target.value)} />                              
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicStatus"> 
                                <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        value="Aberto"
                                        label="Aberto"
                                        onChange={(e) => setStatus(e.target.value)}
                                        checked={status === 'Aberto'}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        value="Andamento"
                                        label="Andamento"
                                        onChange={(e) => setStatus(e.target.value)}
                                        checked={status === 'Andamento'}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        value="Fechado"
                                        label="Fechado"
                                        onChange={(e) => setStatus(e.target.value)}
                                        checked={status === 'Fechado'}
                                    />     
                            </Form.Group>   
                            <Form.Group className="mb-3" controlId="formBasicObservacao"> 
                                <Form.Label>Observação</Form.Label>
                                <Form.Control type="text" as="textarea" rows={3} className='textAreaServices'
                                    value={observacao} onChange={(e) => setObservacao(e.target.value)} />       
                            </Form.Group>                             
                            <Button variant="primary" type="submit" className="btnSalvarProfile">
                                Salvar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}