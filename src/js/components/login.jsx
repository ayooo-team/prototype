'use strict';

import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {

    render () {

        return (
            <div>
                <h1>Login Page</h1>
                <Link to="/dashboard">
                    <h3>Login</h3>
                </Link>
            </div>
        );
    }
};

export default Login;
