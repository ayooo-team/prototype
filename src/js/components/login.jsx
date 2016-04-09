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
                error ?
                ( error.toString() === "Error: The specified user does not exist." ?
                this.newUserEmailCheck(credentials) : alert(error)) :
                window.location = "/#dashboard";
        });
    }

    newUserEmailCheck (credentials) {

        const isEmailSame = prompt(`Welcome to Ayooo!
Type in your email address again to make sure there are no typos!`);

        isEmailSame === credentials.email ?
        this.signUserUp(credentials) :
        alert("Email addresses do not match. Please check and try again.");
    }

    signUserUp (credentials) {

        console.log('signing up new user');
        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
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
                <h1 className="login-title">Log In or Sign Up</h1>
                <div className="login-wrapper">

                    <div className="form-block">
                        <label className="col-12 form-label ">Email:</label>
                        <input className="col-12 form-input" id="login-email-input" type="text" ref="email" />

                        <label className="col-12 form-label">Password:</label>
                        <input className="col-12 form-input" id="login-password-input" type="password" ref="password" />
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText={ "LOG IN / SIGN UP" } />

            </div>
        );
    }
};

export default Login;
