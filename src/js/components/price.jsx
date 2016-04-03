'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class PriceSuggestion extends React.Component {

    constructor(props) {

        super();
        this.checkInput = this.checkInput.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    checkInput (event) {

        event.preventDefault();
        this.refs.price.value ? (
          this.saveDataToParentState(), window.location=this.props.pricePage["confirmationPageLink"]
          ) : (
          alert("Please provide a price in GBP")
        );
    }

    saveDataToParentState() {

        const savePriceData = this.props.savePriceData;
        savePriceData({
            price: this.refs.price.value
        });
    }

    render () {

        return (

            <div className="page">

                <h3>{ this.props.pricePage["pricePageDescription"] }</h3>

                <div className="form-block">
                    <label className="form-block-title">PRICE:</label>
                    <span className="flex-item" type="text">£</span>
                    <input className="flex-item" type="text" ref="price" />
                </div>

                <GhostButton onClick={ this.checkInput } buttonText={ "NEXT" } />

            </div>
        );
    }
}

export default PriceSuggestion
