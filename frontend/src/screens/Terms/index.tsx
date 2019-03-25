

import React, { PureComponent, Fragment, CSSProperties } from "react";
import { NavBarUnlogged } from "../../components/NavBar";
import Footer from "../../components/Footer";
import Container from "reactstrap/lib/Container";
import l18n from '../../l18n';

interface StylesProps {
    container: CSSProperties
    h1: CSSProperties
}

const styles: StylesProps = {
    container: {
        minHeight: 500
    },
    h1: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
}

class Terms extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavBarUnlogged />

                <Container className='chat-container' style={styles.container}>
                    <header>
                        <h1 style={styles.h1}>{l18n.terms_conditions_title}</h1>
                    </header>

                    <br />

                    {l18n.terms_conditions_body}

                </Container>

                <Footer />
            </Fragment>
        );
    }
}

export default Terms;