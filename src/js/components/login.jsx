'use strict';

import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {

    getFormData () {
        event.preventDefault();

        const credentials = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };

        console.log(credentials);
    }

    render () {

        return (
            <div>
                <h1>Login Page</h1>

                <input type="text" name="email" ref="email"/>
                <input type="text" name="password" ref="password"/>
                <button onClick={ this.getFormData.bind(this) }>Login</button>

                <Link to="/dashboard">
                    <h3>Login</h3>
                </Link>
            </div>
        );
    }
};

export default Login;
