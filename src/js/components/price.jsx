'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class PriceSuggestion extends React.Component {

    render () {

        return (

            <div className="page">

                <h3>{ this.props.description }</h3>

                <div className="form-block">
                    <label className="form-block-title">PRICE:</label>
                    <span className="flex-item" type="text">£</span>
                    <input className="flex-item" type="text" ref="price" placeholder="HOUR" />
                </div>

                <GhostButton pageLink={ this.props.confirmationPage } buttonText={ "POST" } />

            </div>
        );
    }
}

export default PriceSuggestion
