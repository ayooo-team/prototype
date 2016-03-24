'use strict';

import React from 'react';

class Dashboard extends React.Component {

    render () {

        return(
            <div className="dashboard-container">
                <div>
                    <h1>Past transactions</h1>
                </div>
                <div>
                    <h1>New transaction</h1>
                </div>
            </div>
        );
    }
}

export default Dashboard;
