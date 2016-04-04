'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class PriceSuggestion extends React.Component {

    render () {

        return (

            <div className="data-collection-page flex-column-wrapper">

                <h3>{ this.props.description }</h3>

                <div className="form-block flex-container">
                    <p className="input-title flex-item">PRICE:</p>
                    <div className="input-wrapper flex-item">
                        <span className="" type="text">£</span>
                        <input className="" type="text" ref="price" placeholder="HOUR" />
                    </div>
                </div>

                <GhostButton pageLink={ this.props.confirmationPage } buttonText={ "POST" } />

            </div>
        );
    }
}

export default PriceSuggestion
