'use strict';

import React from 'react';

class GhostButton extends React.Component {



    render () {

        return this.props.href ? (

            <button className="ghost-button">
                <a href={ this.props.href }>
                    { this.props.buttonText }
                </a>
            </button>

          ) : (

            <button className="ghost-button" onClick={ this.props.onClick }>
                { this.props.buttonText }
            </button>

            )
    }
}

export default GhostButton;
