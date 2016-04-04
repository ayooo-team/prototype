'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class SetDeliveryDate extends React.Component {

    constructor () {

        super();
        this.ifFuture = this.ifFuture.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.checkInput = this.checkInput.bind(this);

        this.state = {
          dateSetter: "none",
        }
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
            console.log("TODAY");
            const now = Date();
            deliveryRequest["deliveryDate"] = now.split(" ").splice(1, 3).join(" ");
        } else if (this.refs.setDeliveryDate.value === "future") {
            console.log("FUTURE");
            const day = this.refs.deliveryDateDay.value;
            const month = this.refs.deliveryDateMonth.value;
            const year = this.refs.deliveryDateYear.value;
            const daysInAMonth = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
            const monthsInAYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const fourDigits = /\d{4}/g;

            if (daysInAMonth.indexOf(day.toString()) <= (-1)) {
                alert("Please input a valid date in");
            } else {
                if ( monthsInAYear.indexOf(month) <= (-1) ) {
                  alert("Please input a valid month - e.g. 'May' ");
                } else {
                  if (year.match(fourDigits)) {
                    deliveryRequest["deliveryDate"]=month + " " + day + " " + year;
                  } else {
                    alert("Please input a valid year")
                  }
                }
            }
        } else {
            console.log("ANYTIME");
            deliveryRequest["deliveryDate"]= "anytime";
        }

        this.checkInput(deliveryRequest, (result) => {

            result ? (this.saveDataToParentState(deliveryRequest["deliveryDate"]), window.location="/#/send-post/price") : alert("Please complete all fields.");
        });
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

            <div className="page form-block">

                <label className="form-block-title">When do you need your parcel to be delivered?</label>

                <select ref="setDeliveryDate" id="setDeliveryDate" onChange={ this.ifFuture }>
                  <option className="form-input" select="selected"value="today">Today</option>
                  <option className="form-input" value="future">Future</option>
                  <option className="form-input" value="anytime">Anytime</option>
                </select>

                <div className="flex-wrapper">
                    <input className="form-input flex-item" type="text" ref="deliveryDateDay" style={{ display: this.state.dateSetter }} placeholder="DAY" />
                    <input className="form-input flex-item" type="text" ref="deliveryDateMonth" style={{ display: this.state.dateSetter }} placeholder="MONTH" />
                    <input className="form-input flex-item" type="text" ref="deliveryDateYear" style={{ display: this.state.dateSetter }} placeholder="YEAR" />
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

            </div>
        );
    }
}

export default SetDeliveryDate
