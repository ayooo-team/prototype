'use strict';

import React from 'react';

const DownloadButton = (props) => {

    let href = "/download" + props.query;

    return (
        <button className="ghost-button">
            <a href={ href } download={ props.filename }>
                { props.buttonText }
            </a>
        </button>
    );
}

export default DownloadButton;
