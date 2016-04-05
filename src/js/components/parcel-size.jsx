'use strict';

import React from 'react';
import Options from './options.jsx';
import data from '../../../data/traveller-space.json';
import GhostButton from './ghost-button.jsx';

class ParcelSize extends React.Component {

    constructor() {

        super();
        this.setRadioOptionInState = this.setRadioOptionInState.bind(this);
        this.storeRadioOptionOnly = this.storeRadioOptionOnly.bind(this);
        this.storeRadioOptionAndWeight = this.storeRadioOptionAndWeight.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    setRadioOptionInState (event) {

        event.preventDefault();
        this.setState({
            chosenOption: event.target.id,
            showTick: "block",
            hideTick: "none"
        });
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
              weightAllowance: this.refs.weight.value
            })
        ) : (
            saveParcelSize({
              chosenOption: optionLowerCase
            })
        )
    }

    render () {

        var radioDiv = data["space"].map( (element, index, array) => {

            return <Options onClick={ this.setRadioOptionInState } key={ index } blockTitle={ element.title } blockImage={ element.image } blockText={ element.text } />
        });

        return this.props.type === "travel" ? (

          <div className="page data-collection-page">

              <h3 className="">DEFINE YOUR CAPACITY</h3>
              <div className="radio-container">
                  { radioDiv }
              </div>

              <div className="weight-input-container row">
                  <h4 className="input-title col-7">MAX WEIGHT:</h4>
                  <input className="input-number large col-4" type="number" ref="weight" placeholder="HOUR" />
                  <p className="col-1">kg</p>
              </div>

              <GhostButton onClick={ this.storeRadioOptionAndWeight } buttonText="NEXT" />

          </div>

          ) : (

          <div className="data-collection-page">

              <div className="">
                  <h3 className="">DEFINE YOUR CAPACITY</h3>
                  { radioDiv }
              </div>

              <GhostButton onClick={ this.storeRadioOptionOnly } buttonText="BACK" />

          </div>

      );
    }
}

export default ParcelSize
