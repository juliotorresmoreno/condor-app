
import React, { PureComponent, Fragment, CSSProperties } from "react";
import { NavBarLogged } from "../../components/NavBar";
import Container from "reactstrap/lib/Container";
import ListGroup from 'reactstrap/lib/ListGroup'
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Row from "reactstrap/lib/Row";
import { Col } from "reactstrap";
import Input from "reactstrap/lib/Input";

interface PropsType {

}

interface StylesProps {
    search_bar: CSSProperties
}

const styles: StylesProps = {
    search_bar: {
        marginBottom: 10
    }
}

class Home extends PureComponent<PropsType> {
    render() {
        return (
            <Fragment>
                <NavBarLogged />
                <br />

                <Container>
                    <Row>
                        <Col md={{ size: 8 }}>
                        
                        </Col>
                        <Col md={{ size: 4 }}>
                            <Input style={styles.search_bar} type="text" />
                            <ListGroup>
                                <ListGroupItem>
                                    hola
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Home;