import { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import './profile.css';



export default function Profile() {
    
    const { user, setUser, storageUser  } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    async function handleUpload() {
        let currentId = user.uid;
        await firebase.storage()
            .ref(`images/${currentId}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                await firebase.storage().ref(`images/${currentId}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url;
                        await firebase.firestore().collection('users')
                            .doc(currentId)
                            .update({
                                avatarUrl: urlFoto,
                                nome: nome
                            }).then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                    nome: nome
                                }
                                setUser(data);
                                storageUser(data);
                                toast.success('Dados alterados com sucesso!');
                            }).catch(() => {
                                toast.error('Ops, algo deu errado');
                            })
                    }).catch(() => {
                        toast.error('Ops, algo deu errado');
                    })
                
               
            }).catch((e) => {
                toast.error('Ops, algo deu errado na sua foto');
            })
    }

    async function handleSave(e) {
        e.preventDefault();

        if (imageAvatar === null && nome !== '') {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome,
            }).then(() => {
                let data = {
                    ...user,
                    nome: nome
                }
                setUser(data);
                storageUser(data);
            })
        } else if(nome !== '' && imageAvatar !== null) {
            handleUpload();
        }

    }

    function handleFile(e) {
        if (e.target.files[0]){
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            } else {
                toast.error('Envie uma imagem PNG, JPEG ou JPG');
                setImageAvatar(null);
                return null;
            }
        }
    }

    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md="12" className='divProfile'>
                        <Title name="Meu Perfil">
                            <FiSettings color="#000" size={25} />
                        </Title>
                        <Form onSubmit={handleSave} className='formProfile'>
                            <Form.Group className="mb-12" controlId="formBasicFoto">
                                <div className='divAvatar'>
                                    <label className="labelAvatar">
                                        <span>
                                            <FiUpload color="#fff" size={25}/>
                                        </span>
                                        <input type="file" accept='image/*' onChange={handleFile} /><br />
                                        {
                                            avatarUrl === null ?
                                                <img src={avatar} width={250} height={250} alt="Foto de perfil" className='imagemProfile'/>
                                            :
                                                <img src={avatarUrl} width={250} height={250} alt="Foto de perfil" className='imagemProfile'/>
                                        }
                                    
                                        </label>
                                    </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={ (e) => setNome(e.target.value)} />                              
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail"> 
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} disabled={true} />       
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