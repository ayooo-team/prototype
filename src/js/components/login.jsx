'use strict';

import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';

class Login extends React.Component {

    constructor (props) {

        super();
        this.checkAuthState();
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? window.location = "/#dashboard" : console.log('user not logged in');
    }

    getFormData () {
        event.preventDefault();

        const credentials = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };

        this.logUserIn(credentials);
    }

    logUserIn (credentials) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        firebaseApp.authWithPassword(credentials, (error, authData) => {
            error ? this.isNewUser(error, (callback) => {this.signUserUp(firebaseApp, credentials)}) : window.location = "/#dashboard";
        });
    }

    isNewUser (error, callback) {

        error.toString() === "Error: The specified user does not exist." ? callback("new user") : alert(error);
    }

    signUserUp (firebaseApp, credentials) {

        firebaseApp.createUser(credentials, (error, userData) => {
            error ? alert(error) : this.logUserIn(credentials);
      });
    }

    render () {

        return (
            <div>
                <h1>Login Page</h1>

                <input type="text" ref="email"/>
                <input type="text" ref="password"/>
                <button onClick={ this.getFormData.bind(this) }>Login</button>

                <Link to="/dashboard">
                    <h3>Login</h3>
                </Link>
            </div>
        );
    }
};

export default Login;
