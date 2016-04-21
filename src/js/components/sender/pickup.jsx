'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class PickUp extends React.Component {

    constructor() {

        super();

        this.checkAuthState( (response) => {
            response === 'yes' ? console.log("user logged in") : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.ifSomeoneElse = this.ifSomeoneElse.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);

        this.state = {
            pickUpIdentity: "none",
            recipientIdentity: "none"
        }
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    ifSomeoneElse (event) {

        event.target.value === "else" ?
        this.setState({ [event.target.id]: "inline-block" }) :
        this.setState({ [event.target.id]: "none" })
    }

    getFormData (event) {

        event.preventDefault();

        const pickUpIdentity = this.refs.pickUpIdentity.value;
        const recipientIdentity = this.refs.recipientIdentity.value;

        let pickUpData = {
            fromCity: this.refs.fromCity.value,
            fromPostCode: this.refs.fromPostcode.value,
            toCity: this.refs.toCity.value,
            toPostCode: this.refs.toPostcode.value,
        };

        if (pickUpIdentity === "else" && recipientIdentity === "else") {
            console.log("NEITHER SELF");
            pickUpData["pickUpIdentity"] = this.refs.pickUpElseName.value + " ( " + this.refs.pickUpElseEmail.value + " )"
            pickUpData["recipientIdentity"] = this.refs.recipientElseName.value + " ( " + this.refs.recipientElseEmail.value + " )"
        } else if (pickUpIdentity === "self" && recipientIdentity === "else") {
            console.log("PICKUP");
            pickUpData["pickUpIdentity"]= "Me";
            pickUpData["recipientIdentity"]= this.refs.recipientElseName.value + " ( " + this.refs.recipientElseEmail.value + " )"
        } else if (pickUpIdentity === "else" && recipientIdentity === "self") {
            console.log("RECIPIENT");
            pickUpData["pickUpIdentity"]= this.refs.pickUpElseName.value + " ( " + this.refs.pickUpElseEmail.value + " )"
            pickUpData["recipientIdentity"]="Me";
        } else {
            console.log("BOTH SELF")
            pickUpData["pickUpIdentity"]="Me";
            pickUpData["recipientIdentity"]="Me";
        }

        this.checkInput(pickUpData, (result) => {

            result ? (this.saveDataToParentState(pickUpData), window.location="/#/send-post/parcel-details") : alert("Please complete all fields.");
        });
    }


    checkInput (data, callback) {

        const dataKeys = Object.keys(data);
        var counter = 0;
        var emptyFields = 0;
        dataKeys.forEach( (element, index, array) => {

            data[element] === "" ? (counter++, emptyFields++) : (counter++)

            if (counter === dataKeys.length) {
                emptyFields === 0 ? callback(true) : callback(false);
            }
        } );
    }

    saveDataToParentState(pickUpData) {

        const savePickUpData = this.props.savePickUpData;
        savePickUpData(pickUpData);
    }

    render () {

        return (

            <div className="page form">

                <div className="form-block">
                    <label className="form-block-title col-12">FROM:</label>
                    <input className="form-input col-6" type="text" ref="fromCity" placeholder="CITY" />
                    <input className="form-input col-6" type="text" ref="fromPostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title col-12">Who will meet the carrier at the pickup location?</label>
                    <select className="col-12" ref="pickUpIdentity" id="pickUpIdentity" onChange={ this.ifSomeoneElse }>
                        <option className="form-input" select="selected" value="self">I will</option>
                        <option className="form-input"value="else">Someone Else</option>
                    </select>
                    <input className="form-input col-6" type="text" ref="pickUpElseName" style={{ display: this.state.pickUpIdentity}} placeholder="Pickup person's name" />
                    <input className="form-input col-6" type="text" ref="pickUpElseEmail" style={{ display: this.state.pickUpIdentity}} placeholder="Pickup person's email" />
                </div>

                <div className="form-block">
                    <label className="form-block-title col-12">TO:</label>
                    <input className="form-input col-6" type="text" ref="toCity" placeholder="CITY" />
                    <input className="form-input col-6" type="text" ref="toPostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title col-12">Who will meet the carrier at the delivery location?</label>
                    <select className="col-12" ref="recipientIdentity" id="recipientIdentity" onChange={ this.ifSomeoneElse }>
                      <option className="form-input" select="selected" value="self">I will</option>
                      <option className="form-input"value="else">Someone Else</option>
                    </select>
                    <input className="form-input col-6" type="text" ref="recipientElseName" style={{ display: this.state.recipientIdentity}} placeholder="Recipient's name" />
                    <input className="form-input col-6" type="text" ref="recipientElseEmail" style={{ display: this.state.recipientIdentity}} placeholder="Recipient's email" />
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />
            </div>
        );
    }
}

export default PickUp
