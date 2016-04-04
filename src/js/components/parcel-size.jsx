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
            this.saveDataToParentState(), window.location=(this.props.pageType+"/price")
        ) : (
            alert("Please tell us the capacity you have in your luggage")
        )
    }

    saveDataToParentState () {

        const saveParcelSize = this.props.saveParcelSize;

        this.refs.weight ? (
            saveParcelSize({
              chosenOption: this.state.chosenOption,
              weightAllowance: this.refs.weight.value
            })
        ) : (
            saveParcelSize({
              chosenOption: this.state.chosenOption,
            })
        )
    }

    render () {

        var radioDiv = data["space"].map( (element, index, array) => {

            return <Options onClick={ this.setRadioOptionInState } key={ index } blockTitle={ element.title } blockImage={ element.image } blockText={ element.text } />
        });

        return this.props.type === "travel" ? (

          <div className="data-collection-page">

              <div className="radio-container">
                  <h3 className="">DEFINE YOUR CAPACITY</h3>
                  { radioDiv }
              </div>

              <div className="">
                <label className="">WEIGHT:</label>
                <input className="" type="text" ref="weight" placeholder="HOUR" />
                <span className="" type="text">Kg</span>
              </div>

              <GhostButton onClick={ this.storeRadioOptionAndWeight } buttonText="NEXT" />

          </div>

          ) : (

          <div className="data-collection-page">

              <div className="">
                  <h3 className="">DEFINE YOUR CAPACITY</h3>
                  { radioDiv }
              </div>

              <GhostButton onClick={ this.storeRadioOptionOnly } buttonText="NEXT" />

          </div>

      );
    }
}

export default ParcelSize
