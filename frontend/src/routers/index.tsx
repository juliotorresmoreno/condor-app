
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Secure from './Secure';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Terms from '../screens/Terms';

interface PropsType {
    
}

class Routes extends PureComponent<PropsType> {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/terms_conditions' component={Terms} />

                <Secure path='/' component={Home} />
            </Switch>
        )
    }
}

export default Routes;