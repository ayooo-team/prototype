'use strict';

import React from 'react';
import classnames from 'classnames';
import LineBreak from '../line-break.jsx';
import GhostButton from '../ghost-button.jsx';

class ParcelDetails extends React.Component {

    constructor (props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ? window.location=this.props.pageType : console.log("all fields filled so far")
            })) : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);
        this.tempSaveFilledFields = this.tempSaveFilledFields.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
        this.getFormData = this.getFormData.bind(this);
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    checkProps (callback) {

        this.props.pickUpData === "default" ? callback('goBack') : callback('ok');
    }

    tempSaveFilledFields (event) {

        let tempData = (this.refs.parcelDescription.value || this.refs.parcelWeight.value) ? (
            {
                tempDescription: this.refs.parcelDescription.value,
                tempWeight: this.refs.parcelWeight.value
            }
        ) : (
            {
                tempDescription: " ",
                tempWeight: " "
            }
        )
        this.saveDataToParentState(tempData)
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
            !(data[element])  ?
            (counter++, emptyFields++) : data[element]===(" ") ?
            (counter++, emptyFields++) : counter++

            if (counter === dataKeys.length) {

                emptyFields === 0 ? callback(true) : callback(false);
            }

        } );
    }

    saveDataToParentState(parcelData) {

        const saveParcelDetails = this.props.saveParcelDetails;
        saveParcelDetails(parcelData);
    }

    render () {

        let inputSize12 = classnames("col-12");
        let inputSize6 = classnames("col-6");
        let labelSize6 = classnames("label", "col-6");

        return ( this.props.parcelDetails["tempDescription"] || this.props.parcelDetails["tempWeight"] ) ? (

          <div className="page form">

                <div className="form-block">
                    <h4 className="label page-header">
                        PARCEL DETAILS:
                    </h4>
                    <input className={ inputSize12 } type="text" ref="parcelDescription" placeholder="List what is inside the parcel." defaultValue={ this.props.parcelDetails["tempDescription"] } />
                </div>

                <LineBreak />

                <div className="form-block">
                    <h4 className={ labelSize6 }>
                        Weight:
                    </h4>
                    <input className="" type="text" ref="parcelWeight" defaultValue={ this.props.parcelDetails["tempWeight"] } />
                    <p className="" type="text">
                        kg
                    </p>
                </div>

                <LineBreak />

                <div className="form-block">
                    <h4 className={ labelSize6 }>
                        Size:
                    </h4>
                    <div className={ inputSize6 } type="text" ref="parcelSize" onClick={ this.tempSaveFilledFields }>{ this.props.parcelSize["chosenOption"] } --> </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

            </div>

        ) : (

            <div className="page form">

                  <div className="form-block">
                      <h4 className="label page-header">
                          PARCEL DETAILS:
                      </h4>
                      <input className={ inputSize12 } type="text" ref="parcelDescription" placeholder="List what is inside the parcel." />
                  </div>

                  <LineBreak />

                  <div className="form-block">
                      <h4 className="label col-8">
                          Weight:
                      </h4>
                      <div className="input-and-unit">
                          <input className="col-2" type="text" ref="parcelWeight" />
                          <p className="unit col-2" type="text">
                              kg
                          </p>
                      </div>
                  </div>

                  <LineBreak />

                  <div className="form-block">
                      <h4 className={ labelSize6 }>
                          Size:
                      </h4>
                      <h4 className={ inputSize6 } type="text" ref="parcelSize" onClick={ this.tempSaveFilledFields }>
                          Click here to set -->
                      </h4>
                  </div>

                  <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

              </div>
          )
    }

}

export default ParcelDetails
