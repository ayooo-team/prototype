'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ParcelDetails extends React.Component {

    constructor (props) {

        super();
        this.tempSaveFilledFields = this.tempSaveFilledFields.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
        this.getFormData = this.getFormData.bind(this);
    }

    tempSaveFilledFields (event) {

        let tempData = {
            tempDescription: this.refs.parcelDescription.value,
            tempWeight: this.refs.parcelWeight.value
        }

        this.saveDataToParentState(tempData);
        window.location = "/#/send-post/parcel-size"
    }

    getFormData (event) {

        event.preventDefault();

        let parcelData = {
            parcelDescription: this.refs.parcelDescription.value,
            parcelWeight: this.refs.parcelWeight.value,
            parcelSize: this.props.parcelSize["chosenOption"]
        };

        this.checkInput(parcelData, (result) => {

            result ? (this.saveDataToParentState(parcelData), window.location="/#/send-post/set-delivery-date") : alert("Please complete all fields.");
        });
    }


    checkInput (data, callback) {

        const dataKeys = Object.keys(data);
        var counter = 0;
        var emptyFields = 0;
        dataKeys.forEach( (element, index, array) => {
            data[element] === ("" || "default")  ? (counter++, emptyFields++) : (counter++)
            if (counter === dataKeys.length) {
                emptyFields === 0 ? callback(true) : callback(false);
            }
        } );
    }

    saveDataToParentState(pickUpData) {

      const saveParcelDetails = this.props.saveParcelDetails;
      saveParcelDetails(pickUpData);
    }

    render () {

        return ( this.props.parcelDetails["tempDescription"] || this.props.parcelDetails["tempWeight"] ) ? (

          <div className="page form">

                <div className="form-block">
                    <label className="form-block-title">PARCEL DETAILS:</label>
                    <input className="form-input" type="text" ref="parcelDescription" placeholder="List what is inside the parcel." defaultValue={ this.props.parcelDetails["tempDescription"] } />
                </div>

                <div className="form-block">
                  <label className="form-block-title">Weight:</label>
                  <input className="flex-item" type="text" ref="parcelWeight" defaultValue={ this.props.parcelDetails["tempWeight"] } />
                  <span className="flex-item" type="text">Kg</span>
                </div>

                <div className="form-block">
                    <label className="form-block-title">Size:</label>
                    <div className="form-input" type="text" ref="parcelSize" onClick={ this.tempSaveFilledFields }>{ this.props.parcelSize["chosenOption"] } >> </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

            </div>

        ) : (

            <div className="page form">

                  <div className="form-block">
                      <label className="form-block-title">PARCEL DETAILS:</label>
                      <input className="form-input" type="text" ref="parcelDescription" placeholder="List what is inside the parcel." />
                  </div>

                  <div className="form-block">
                    <label className="form-block-title">Weight:</label>
                    <input className="flex-item" type="text" ref="parcelWeight" />
                    <span className="flex-item" type="text">Kg</span>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">Size:</label>
                      <div className="form-input" type="text" ref="parcelSize" onClick={ this.tempSaveFilledFields }>Click here to set >> </div>
                  </div>

                  <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

              </div>
          )
    }

}

export default ParcelDetails
