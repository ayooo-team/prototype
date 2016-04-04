'use strict';

import React from 'react';
import { Link } from 'react-router';

class GhostButton extends React.Component {

    render () {

        return this.props.pageLink && this.props.onClick ? (

            <button className="ghost-button" onClick={ this.props.onClick } >
                <Link to={ this.props.pageLink }>
                    <span>
                        { this.props.buttonText }
                    </span>
                </Link>
            </button>


            ) : this.props.pageLink ? (

            <button className="ghost-button" >
                <Link to={ this.props.pageLink }>
                    <span>
                        { this.props.buttonText }
                    </span>
                </Link>
            </button>

          ) : (

            <button className="ghost-button" onClick={ this.props.onClick }>
                <span>
                    { this.props.buttonText }
                </span>
            </button>

        );
    }
}

export default GhostButton;
