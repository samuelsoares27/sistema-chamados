import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Button, Container, Row, Col } from "react-bootstrap";
import Header from '../../components/Header'
import Title from "../../components/Title";
import { FiSettings } from "react-icons/fi";

export default function Dashboard() {
    
    
    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md="12">
                        <Title name="Chamados">
                            <FiSettings color="#000" size={25} />
                        </Title>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}