import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './profile.css'
import { FiSettings } from "react-icons/fi";

export default function Profile() {
    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md="12">
                        <Title name="Meu Perfil">
                            <FiSettings color="#000" size={25} />
                        </Title>
                    </Col>
                </Row>
            </Container>
       </div>  
    );
}