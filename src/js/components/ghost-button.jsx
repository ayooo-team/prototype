'use strict';

import React from 'react';
import { Link } from 'react-router';

class GhostButton extends React.Component {

    render () {

        return this.props.pageLink && this.props.onClick ? (

          <Link to={ this.props.pageLink }>
              <button className="ghost-button" onClick={ this.props.onClick } >
                  { this.props.buttonText }
              </button>
          </Link>


        ) : this.props.pageLink ? (

            <Link to={ this.props.pageLink }>
                <button className="ghost-button" >
                    { this.props.buttonText }
                </button>
            </Link>

          ) : (

            <button className="ghost-button" onClick={ this.props.onClick }>
                { this.props.buttonText }
            </button>

        );
    }
}

export default GhostButton;
