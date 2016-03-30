'use strict';

import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';
import GhostButton from './ghost-button.jsx';

class Login extends React.Component {

    constructor (props) {

        super();
        this.checkAuthState();

        this.getFormData = this.getFormData.bind(this);
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? window.location = "/#dashboard" : console.log('user not logged in');
    }

    getFormData (event) {

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
            console.log("authData!" + authData)
            error ? this.isNewUser(error, (callback) => {this.signUserUp(firebaseApp, credentials)}) : window.location = "/#dashboard";
        });
    }

    isNewUser (error, callback) {

        error.toString() === "Error: The specified user does not exist." ? callback("new user") : alert(error);
    }

    signUserUp (firebaseApp, credentials) {

        firebaseApp.createUser(credentials, (error, userData) => {
            error ? alert(error) : this.createUserInstance(credentials, userData.uid), this.logUserIn(credentials);
      });
    }

    createUserInstance (credentials, userId) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        firebaseApp.child("users").child(userId).set({
            email: credentials.email
        });
    }

    render () {

        return (
            <div className="page form">
                <h1 className="login-title">Log In or Sign Up </h1>

                <div className="form-block">
                    <label className="form-label login-width-adjust">Email:</label>
                    <input className="form-input" type="text" ref="email" />
                </div>

                <div className="form-block">
                    <label className="form-label">Password:</label>
                    <input className="form-input" type="text" ref="password" />
                </div>

                <GhostButton onClick={ this.getFormData } buttonText={ "LOG IN / SIGN UP" } />

            </div>
        );
    }
};

export default Login;
