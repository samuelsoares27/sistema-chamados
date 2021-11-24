import { Container, Row, Col } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './customers.css'

export default function Customers() {
    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md="12">
                        <Title name="Clientes">
                            <FiUser color="#000" size={25} />
                        </Title>
                    </Col>
                </Row>
            </Container>
       </div>  
    );
}