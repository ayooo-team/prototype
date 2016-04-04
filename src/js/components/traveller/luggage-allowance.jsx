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

            <div className="data-collection-page flex-column-wrapper">

                <div className="form-block">
                    <h2 className="form-block-title">DEFINE YOUR CAPACITY</h2>
                    { radioDiv }

                </div>

                <div className="max-weight-container flex-container">
                    <label className="input-title flex-item">MAX WEIGHT:</label>
                    <div className="input-wrapper flex-item">
                        <input className="" type="text" ref="weight" placeholder="" />
                        <span className="" type="text">kg</span>
                    </div>
                </div>

                <GhostButton pageLink={ "/price" } buttonText={ "NEXT" } />

            </div>
        );
    }
}

export default Space;
