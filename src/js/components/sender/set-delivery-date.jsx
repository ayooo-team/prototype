'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class SetDeliveryDate extends React.Component {

    constructor (props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ? window.location=this.props.pageType + "/parcel-details" : console.log("all fields filled so far")
            })) : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);

        this.ifFuture = this.ifFuture.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.checkInput = this.checkInput.bind(this);

        this.state = {
            dateSetter: "none",
        };

        Number.prototype.inRange = function (lower, upper) {

            return this >= lower && this <= upper;
        }
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    checkProps (callback) {

        this.props.parcelDetails === "default" ? callback('goBack') : callback('ok');
    }

    ifFuture (event) {

        event.target.value === "future" ?
        this.setState({ dateSetter: "inline-block" }) :
        this.setState({ dateSetter: "none" })
    }

    getFormData (event) {

        event.preventDefault();

        let deliveryRequest = {};

        if (this.refs.setDeliveryDate.value === "today") {

            const now = new Date();
            const date = now.getDate();
            const month = now.getMonth() <= 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
            const year = now.getFullYear();
            deliveryRequest["deliveryDate"] = date + "/" + month + "/" + year;
            console.log(deliveryRequest["deliveryDate"]);
            this.saveDataToParentState(deliveryRequest["deliveryDate"]);
            window.location = "/#/send-post/price";

        } else if (this.refs.setDeliveryDate.value === "future") {
            console.log("FUTURE");
            let day = this.refs.deliveryDateDay.value;
            let month = this.refs.deliveryDateMonth.value;
            const year = this.refs.deliveryDateYear.value;
            const fourDigits = /\d{4}/g;

            if ( day && month && year ) {

                let day = parseFloat(this.refs.deliveryDateDay.value);
                let month = parseFloat(this.refs.deliveryDateMonth.value);

                if ( !day.inRange(1, 31) ) {

                    alert("Please input a valid date in");
                } else {

                    if ( !month.inRange(1, 12) ) {

                        alert("Please input a valid month in number form, e.g. for \"May\", input 5");
                    } else {

                        if ( year.match(fourDigits) ) {

                            deliveryRequest["deliveryDate"]= day + "/" + month + "/" + year;

                            this.checkInput(deliveryRequest, (result) => {

                                result ? (this.saveDataToParentState(deliveryRequest["deliveryDate"]), window.location="/#/send-post/price") : alert("Please complete all fields.");
                            });
                        } else {

                            alert("Please input a valid year");
                        }
                    }
                }
            } else {
                callback("incomplete");
            }
        } else {
            console.log("ANYTIME");
            deliveryRequest["deliveryDate"]= "anytime";
            this.saveDataToParentState(deliveryRequest["deliveryDate"]);
            window.location="/#/send-post/price"
        }

    }

    checkInput (deliveryDate, callback) {

        deliveryDate ? callback(true) : callback(false);
    }

    saveDataToParentState(requestedDate) {

      const saveRequestedDate = this.props.saveRequestedDate;
      saveRequestedDate(requestedDate);
    }

    render () {

        return (

            <div className="page form-block set-delivery-date-container">

                    <label className="col-12 page-header">When do you need your parcel to be delivered?</label>

                    <select className="col-12" ref="setDeliveryDate" id="setDeliveryDate" onChange={ this.ifFuture }>
                        <option className="form-input" select="selected"value="today">Today</option>
                        <option className="form-input" value="future">Future</option>
                        <option className="form-input" value="anytime">Anytime</option>
                    </select>

                    <div className="flex-wrapper">
                        <input className="col-4 form-input flex-item" type="text" ref="deliveryDateDay" maxLength="2" style={{ display: this.state.dateSetter }} placeholder="DAY" />
                        <input className="col-4 form-input flex-item" type="text" ref="deliveryDateMonth" maxLength="2" style={{ display: this.state.dateSetter }} placeholder="MONTH" />
                        <input className="col-4 form-input flex-item" type="text" ref="deliveryDateYear" maxLength="4" style={{ display: this.state.dateSetter }} placeholder="YEAR" />
                    </div>

                    <GhostButton onClick={ this.getFormData } buttonText="NEXT" />
            </div>
        );
    }
}

export default SetDeliveryDate
