

import React, { PureComponent, Fragment, CSSProperties } from "react";
import Input from "reactstrap/lib/Input";
import * as users from '../../actions/users';
import { connect } from 'react-redux';

interface PropsType {
    style?: CSSProperties
}

interface PropsTypeExtend extends PropsType {
    dispatch: CallableFunction
}

const mapProps = (state: any) => ({

});

interface StylesProps {
    search_bar: CSSProperties
}

const styles: StylesProps = {
    search_bar: {
        marginBottom: 10
    }
}

class OSearchUsersBar extends PureComponent<PropsTypeExtend, any> {

    state = {
        q: ''
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            q: evt.target.value
        });
        if (evt.target.value.length < 3) {
            this.props.dispatch(users.setList([]));
            return;
        }
        this.props.dispatch(users.list(evt.target.value));
    }

    render() {
        return (
            <Fragment>
                <Input
                    type='search'
                    value={this.state.q}
                    onChange={this.handleChange}
                    style={styles.search_bar} />
            </Fragment>
        );
    }
}

export const SearchUsersBarConnected = connect(mapProps)(OSearchUsersBar);


/**
 * fdf
 */
const SearchUsersBar = (props: PropsType): JSX.Element => <SearchUsersBarConnected {...props} />

export default SearchUsersBar;