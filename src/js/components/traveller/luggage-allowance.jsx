'use strict';

import React from 'react';
import Options from '../options.jsx';
import data from '../../../../data/traveller-space.json';
import GhostButton from '../ghost-button.jsx';

class Space extends React.Component {

    constructor() {

        super();
        this.storeRadioOption = this.storeRadioOption.bind(this);
        this.radioOptionClicked = this.radioOptionClicked.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    radioOptionClicked() {

        this.state && this.state.chosenOption ?
          this.refs.weight.value ? (
            this.saveDataToParentState(), window.location="/#travel-post/price"
          ) : (
            alert("Please tell us your maximum weight allowance")
          ) :
        alert("Please tell us the capacity you have in your luggage");
    }

    storeRadioOption (event) {

        event.preventDefault();
        this.setState({
            chosenOption: event.target.id,
            showTick: "block",
            hideTick: "none"
        });
    }

    saveDataToParentState() {

        const saveLuggageData = this.props.saveLuggageData;
        saveLuggageData({
            chosenOption: this.state.chosenOption,
            weightAllowance: this.refs.weight.value
        });
    }

    render () {

        var radioDiv = data["space"].map( (element, index, array) => {

            return <Options onClick={ this.storeRadioOption } key={ index } blockTitle={ element.title } blockImage={ element.image } blockText={ element.text } />
        });

        return (

            <div className="page">

                <div className="form-block">
                    <h3 className="form-block-title">DEFINE YOUR CAPACITY</h3>
                    { radioDiv }
                </div>

                <div className="form-block">
                    <label className="form-block-title">WEIGHT:</label>
                    <input className="flex-item" type="text" ref="weight" placeholder="HOUR" />
                    <span className="flex-item" type="text">Kg</span>
                </div>

                  <GhostButton onClick={ this.radioOptionClicked } buttonText="NEXT" />

            </div>
        )
    }
}

export default Space
