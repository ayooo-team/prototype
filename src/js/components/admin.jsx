'use strict';

import React from 'react';
import DownloadButton from './download-button.jsx';
import LoginFields from './login-fields.jsx';
import GhostButton from './ghost-button.jsx';

class Admin extends React.Component {

    constructor (props) {

        super();

        this.state = {
            pageReady: false,
            userLoggedIn: false
        };

        this.getUserID = this.getUserID.bind(this);
        this.getFormData = this.getFormData.bind(this);
    }

    componentDidMount () {

        this.getUserID();
    }

    getUserID (callback) {

        const storedInfo = localStorage.getItem("firebase:session::ayooo");

        storedInfo ?
        this.checkIfAdmin(JSON.parse(storedInfo).uid) :
        this.setState({
            userLoggedIn: true
        })
    }

    checkIfAdmin(userID) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/admin");

        firebaseApp.once('value', (adminInfo) => {
            const adminDetails = adminInfo.val();
            const adminID = adminDetails["id"];
            userID === adminID ?
            this.setState({ pageReady: true }) :
            this.setState({ userLoggedIn: true })
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
            if (authData) {
                const userID = authData.uid;
                this.checkIfAdmin(userID);
            } else {
                alert(error);
            }
        });
    }

    render () {

        return this.state && this.state.pageReady ? (
            <div className="page">

                <h1 className="admin-header flex-item">App admin</h1><br/>
                <h3 className="flex-item"> Choose a file to download: </h3>
                <div className="download-button-wrapper flex-item">
                    <DownloadButton query="?filename=senders" filename="senders.csv" buttonText="Sender requests" />
                    <DownloadButton query="?filename=travellers" filename="travellers.csv" buttonText="Traveller requests" />
                </div>
            </div>



        ) : this.state && this.state.userLoggedIn ? (

            <div className="page form">
                <h1 className="admin-login">Log in</h1>
                <LoginFields />
                <GhostButton onClick={ this.getFormData } buttonText={ "LOG IN" } />
            </div>

        ) : (

            <div className="page">
                <h1>LOADING...</h1>
            </div>
        )
    }
}

export default Admin;
