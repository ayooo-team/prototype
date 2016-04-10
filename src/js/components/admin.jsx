'use strict';

import React from 'react';
import DownloadButton from './download-button.jsx';
import GhostButton from './ghost-button.jsx';

class Admin extends React.Component {

    constructor (props) {

        super(props);

        this.getUserID = this.getUserID.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.getFormData = this.getFormData.bind(this);

        this.state = { loading: false }

        this.getUserID((response) => {
            response ?
            this.isUserAuthenticated(response, (isAdmin) => {
                isAdmin === 'admin' ?
                this.setState({ loading: true, userKnown: true, login: response }) :
                this.setState({ loading: true, userKnown: false, login: false })
            }) : console.log("2", "NO ID"), this.state = { loading: true };

        });
    }

    getUserID (callback) {

        const storedInfo = localStorage.getItem("firebase:session::ayooo");
        storedInfo ? callback(JSON.parse(storedInfo).uid) : callback(null);
    }

    isUserAuthenticated (userID, callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/" + userID);

        firebaseApp.once('value', (userInfo) => {
            const userProfile = userInfo.val();
            const userEmail = userProfile["email"];
            this.checkIfAdmin(userEmail, callback);
        });
    }

    checkIfAdmin(userEmail, callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/admin");
        firebaseApp.once('value', (adminInfo) => {
            const adminDetails = adminInfo.val();
            const adminEmail = adminDetails["email"];
            userEmail === adminEmail ? callback("admin") : callback("notAdmin");
        });
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

        });
    }

    render () {

        return this.state && this.state.loading ?

        this.state.userKnown ?

            this.state.login === '1d662c56-9470-4704-8ea6-5ea27f55ee98' ? (

                <div className="page">

                    <h1 className="admin-header flex-item">App admin</h1><br/>
                    <h3 className="flex-item"> Choose a file to download: </h3>
                    <div className="download-button-wrapper flex-item">
                        <DownloadButton query="?filename=senders" filename="senders.csv" buttonText="Sender requests" />
                        <DownloadButton query="?filename=travellers" filename="travellers.csv" buttonText="Traveller requests" />
                    </div>
                </div>
            ) : (
                <div className="page form">

                    <h1 className="login-title">Please Log In:</h1>

                    <div className="form-block">
                        <label className="form-label login-width-adjust">Email:</label>
                        <input className="form-input" type="text" ref="email" />
                    </div>

                    <div className="form-block">
                        <label className="form-label">Password:</label>
                        <input className="form-input" type="password" ref="password" />
                    </div>

                    <GhostButton onClick={ this.getFormData } buttonText={ "LOG IN / SIGN UP" } />

                </div>
        ) : (
            <div className="page form">

                <h1 className="login-title">Please Log In:</h1>

                <div className="form-block">
                    <label className="form-label login-width-adjust">Email:</label>
                    <input className="form-input" type="text" ref="email" />
                </div>

                <div className="form-block">
                    <label className="form-label">Password:</label>
                    <input className="form-input" type="password" ref="password" />
                </div>

                <GhostButton onClick={ this.getFormData } buttonText={ "LOG IN / SIGN UP" } />

            </div>
        ) : (
            <div className="page">
                <h1>LOADING...</h1>
            </div>
        )

    }
}

export default Admin;
