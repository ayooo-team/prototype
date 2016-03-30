'use strict';

import React from 'react';

class GhostButton extends React.Component {



    render () {

        return this.props.href ? (

            <div className="ghost-button">
                <a href={ this.props.href }>
                    { this.props.buttonText }
                </a>
            </div>

            ) : (

            <div className="ghost-button" onClick={ this.props.onClick }>
                { this.props.buttonText }
            </div>

            )
    }
}

export default GhostButton;
