'use strict';

import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {

    render () {

        return(
            <div className="dashboard-container">
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
