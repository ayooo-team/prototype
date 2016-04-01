'use strict';

import React from 'react';
import { Link } from 'react-router';

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
                <div>
                    <h1>Past transactions</h1>
                </div>
                <div>
                    <h1>New transaction</h1>

                    <Link to="/sender">
                        <h3>Sender</h3>
                    </Link>
                    <Link to="/traveller">
                        <h3>Traveller</h3>
                    </Link>
                    <Link to="/user-info">
                        <h3>User Details</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Dashboard;
