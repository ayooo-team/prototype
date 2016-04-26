'use strict';

import React from 'react';
import { Link } from 'react-router';

import GhostButton from './ghost-button.jsx';

class Dashboard extends React.Component {

    constructor (props) {

        super();
        this.checkAuthState();
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? console.log('user logged in') : window.location = "/#" ;
    }

    render () {

        return (

            <div className="page dashboard-container">
                <img className="logo" src="img/logo.png" />
                <h1>AYOOO</h1>
                <h4>How are you using the app today?</h4>
                <div className="button-wrapper">
                    <GhostButton pageLink="/travel-post" buttonText="Deliver a Parcel" />

                    <GhostButton pageLink="/send-post" buttonText="Send a Parcel" />
                </div>


            </div>
        );
    }
}

export default Dashboard;
