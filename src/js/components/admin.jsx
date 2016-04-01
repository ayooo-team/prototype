'use strict';

import React from 'react';
import DownloadButton from './download-button.jsx';

class Admin extends React.Component {

    render () {

        return (
            <div className="page">

                <h1>App admin</h1><br/>
                <h3> Choose a file to download: </h3>
                <DownloadButton query="?filename=senders" filename="senders.csv" buttonText="Sender requests" />
                <DownloadButton query="?filename=travellers" filename="travellers.csv" buttonText="Traveller requests" />
            </div>
        );
    }
}

export default Admin;
