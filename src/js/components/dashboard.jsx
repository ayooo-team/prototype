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

        return(
            <div className="dashboard-container">

                <div className="button-wrapper">
                    <GhostButton pageLink="/travel-post" buttonText="TRAVELLER" />

                    <GhostButton pageLink="/pickup" buttonText="SHIPPER" />
                </div>


            </div>
        );
    }
}

export default Dashboard;
