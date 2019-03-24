

import React, { Fragment, CSSProperties } from 'react';
import Alert from 'reactstrap/lib/Alert';

const styles: CSSProperties = {
    marginTop: 15
};

/**
 * Se usa para mostrar mensajes de error
 * 
 * @param error Es un objeto de error, si es undefined no se muestra el elemento
 * @param style Estilos del objeto
 */
const AlertError = (props: { error?: Error | undefined, style?: CSSProperties }): JSX.Element => {
    if (!props.error) return <Fragment />;
    return (
        <Fragment>
            <Alert color="danger" style={props.style || styles}>
                {props.error.message}
            </Alert>
        </Fragment>
    );
}

export default AlertError;