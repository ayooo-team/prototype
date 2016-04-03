'use strict';

import React from 'react';
import Options from '../options.jsx';
import data from '../../../../data/traveller-space.json';
import GhostButton from '../ghost-button.jsx';

class Space extends React.Component {

    constructor() {
      super();

      this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    saveDataToParentState() {

        const saveLuggageData = this.props.saveLuggageData;
        saveLuggageData("LUGGAGE");
    }


    render () {

        var radioDiv = data["space"].map( (element, index, array) => {

            return <Options key={ index } blockTitle={ element.title } blockImage={ element.image } blockText={ element.text } />
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

                <GhostButton onClick={ this.saveDataToParentState } pageLink="/travel-post/price" buttonText="NEXT" />
            </div>
        )
    }
}

export default Space
