'use strict';

import React from 'react';
import Options from './options.jsx';
import data from '../../../data/traveller-space.json';
import LineBreak from './line-break.jsx';
import GhostButton from './ghost-button.jsx';

class ParcelSize extends React.Component {

    constructor (props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ? window.location=this.props.pageType : console.log("all fields filled so far")
            })) : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);
        this.setRadioOptionInState = this.setRadioOptionInState.bind(this);
        this.storeRadioOptionOnly = this.storeRadioOptionOnly.bind(this);
        this.storeRadioOptionAndWeight = this.storeRadioOptionAndWeight.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);

        this.state = {
            chosenOption: undefined
        };
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    checkProps (callback) {

        this.props.journeyData === "default" ? callback('goBack') : callback('ok');
    }

    setRadioOptionInState (event) {

        event.preventDefault();
        this.setState({
            chosenOption: event.target.id,
            showTick: "block",
            hideTick: "none"

        }, () => console.log(this.state.chosenOption));
    }

    storeRadioOptionAndWeight () {

        this.state && this.state.chosenOption ?
        this.refs.weight.value ? (
            this.saveDataToParentState(), window.location=this.props.pageType + "/price"
        ) : (
            alert("Please tell us your maximum weight allowance")
        ) :
            alert("Please tell us the capacity you have in your luggage");
    }

    storeRadioOptionOnly () {

        this.state && this.state.chosenOption ? (
            this.saveDataToParentState(), window.location=(this.props.pageType + "/parcel-details")
        ) : (
            alert("Please tell us the capacity you have in your luggage")
        )
    }

    saveDataToParentState () {

        const saveParcelSize = this.props.saveParcelSize;
        const optionLowerCase = this.state.chosenOption.charAt(0).toUpperCase() + this.state.chosenOption.substr(1).toLowerCase();

        this.refs.weight ? (

            saveParcelSize({
                chosenOption: optionLowerCase,
                parcelWeight: this.refs.weight.value
            })
        ) : (
            saveParcelSize({
                chosenOption: optionLowerCase
            })
        )
    }

    render () {

        var radioDiv = data["space"].map( (element, index, array) => {

            let lineBreakKey = index + 10;

            return (
                <div>
                    <Options onClick={ this.setRadioOptionInState }
                             selectedRow={ this.state.chosenOption }
                             key={ index }
                             blockTitle={ element.title }
                             blockImage={ element.image }
                             blockText={ element.text } />
                    <LineBreak key={ lineBreakKey } />
                </div>
            );
        });

        return this.props.type === "travel" ? (

          <div className="page data-collection-page">

              <div className="journey-form">
                  <h3 className="page-header">DEFINE YOUR CAPACITY</h3>
                  <div className="radio-container">
                      { radioDiv }
                  </div>

                  <div className="weight-input-container row">
                      <h4 className="input-title col-7">MAX WEIGHT:</h4>
                      <input className="input-number" type="number" ref="weight" />
                      <p className="unit col-2">kg</p>
                  </div>
              </div>

              <GhostButton onClick={ this.storeRadioOptionAndWeight } buttonText="NEXT" />

          </div>

          ) : (

          <div className="page data-collection-page">

              <div className="journey-form">
                  <h3 className="page-header">DEFINE YOUR CAPACITY</h3>
                  <div className="radio-container">
                      { radioDiv }
                  </div>
              </div>


              <GhostButton onClick={ this.storeRadioOptionOnly } buttonText="BACK" />

          </div>

      );
    }
}

export default ParcelSize;
