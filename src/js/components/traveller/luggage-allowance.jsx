'use strict';

import React from 'react';
import Options from '../options.jsx';
import data from '../../../../data/traveller-space.json';
import GhostButton from '../ghost-button.jsx';

class Space extends React.Component {

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

                <GhostButton pageLink={ "/confirm-travel" } buttonText={ "POST" } />

            </div>
        )
    }
}

export default Space
