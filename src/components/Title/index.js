import { Col, Container, Row } from 'react-bootstrap'
import './title.css'


export default function Title({children, name}) {
    return (
        <Container className="componenteTitulo">
            <Row className='rowTitulo'>
                <Col md="12">
                    <div className='divTitle'>
                        {children}
                        <span className='nomeSpan'>{ name }</span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}