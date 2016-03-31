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
            <div className="page dashboard-container">

                <GhostButton pageLink="/traveller" buttonText="TRAVELLER" />

                <GhostButton pageLink="/sender" buttonText="SHIPPER" />

            </div>
        );
    }
}

export default Dashboard;
