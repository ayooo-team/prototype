'use strict';

import React from 'react';
import DownloadButton from './download-button.jsx';

class Admin extends React.Component {

    render () {

        return (
            <div className="page">

                <DownloadButton query="?filename=senders" filename="senders.csv" buttonText="Sender requests" />
                <DownloadButton query="?filename=travellers" filename="travellers.csv" buttonText="Traveller requests" />
            </div>
        );
    }
}

export default Admin;
