'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class PriceSuggestion extends React.Component {

    constructor (props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ?
                ( this.props.type === 'travel' ?
                window.location=this.props.pageType + "/parcel-size" :
                window.location=this.props.pageType + "/parcel-details" ) :
                console.log("all fields filled so far")
            })) :
            window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    checkProps (callback) {

        this.props.parcelSize === "default" ? callback('goBack') : callback('ok');
    }

    checkInput (event) {

        event.preventDefault();
        this.refs.price.value ? (
            this.saveDataToParentState(), window.location=this.props.pageType + "/confirm"
            ) : (
            alert("Please provide a price in GBP")
        );
    }

    saveDataToParentState () {

        const savePriceData = this.props.savePriceData;
        savePriceData({
            price: this.refs.price.value
        });
    }

    render () {

        return (

            <div className="page data-collection-page">

                <h3 className="page-header price">{ this.props.pricePageDescription }</h3>
                <div className="price-area">
                    <div className="form-block row">

                        <p className="input-title col-5">PRICE:</p>
                        <div className="input-wrapper">
                            <span className="label col-2" type="text">£</span>
                            <input className="price-input col-5" type="number" ref="price" />
                        </div>
                    </div>
                </div>

                <GhostButton onClick={ this.checkInput } buttonText={ "NEXT" } />

            </div>
        );
    }
}

export default PriceSuggestion
