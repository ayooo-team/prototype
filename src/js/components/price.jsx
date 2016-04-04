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
          this.saveDataToParentState(), window.location=this.props.pageType + "/confirm"
          ) : (
          alert("Please provide a price in GBP")
        );
    }

    saveDataToParentState() {

        console.log("this price>>>", this.refs.price.value)
        const savePriceData = this.props.savePriceData;
        savePriceData({
            price: this.refs.price.value
        });
    }

    render () {

        return (

            <div className="data-collection-page flex-column-wrapper">

                <h3>{ this.props.pricePageDescription }</h3>

                <div className="form-block flex-container">
                    <p className="input-title flex-item">PRICE:</p>
                    <div className="input-wrapper flex-item">
                        <span className="" type="text">£</span>
                        <input className="" type="number" ref="price" />
                    </div>
                </div>

                <GhostButton onClick={ this.checkInput } buttonText={ "NEXT" } />

            </div>
        );
    }
}

export default PriceSuggestion
