'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class Journey extends React.Component {

    constructor () {

        super ();
        this.getFormData = this.getFormData.bind(this);
        this.saveDataToParentState = this.saveDataToParentState.bind(this);
    }

    getFormData (event) {

        event.preventDefault();

        let journeyData = {

            departureCity: this.refs.departureCity.value,
            departurePostCode: this.refs.departurePostcode.value,
            arrivalCity: this.refs.arrivalCity.value,
            arrivalPostCode: this.refs.arrivalPostcode.value
        };

        this.checkInput(journeyData, (result) => {

            result === "incomplete" ? alert("Please complete all fields.") :
            result === "incorrectDateInput" ? alert("Please input a valid date in") :
            result === "incorrectMonthInput" ? alert("Please input a valid month - e.g. 'May'") :
            result === "incorrectYearInput" ? alert("Please input a valid year") :
            result === "incorrectHour" ? alert("Please input your time in a 24hour format - e.g. '22' hours") :
            result === "incorrectMinutes" ? alert("Please input a valid time") :
            (this.saveDataToParentState(journeyData), window.location="/#/travel-post/parcel-size")
        });
    }

    checkInput (data, callback) {

        if ( data["departureCity"] &&
        data["departurePostCode"] &&
        data["arrivalCity"] &&
        data["arrivalPostCode"] ) {

            this.checkDateInput(data, callback);
        } else {
            callback("incomplete");
        }
    }

    checkDateInput(data, callback) {

        const daysInAMonth = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
        const monthsInAYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const fourDigits = /\d{4}/g;

        const departureDay = this.refs.departureDay.value
        const departureMonth = this.refs.departureMonth.value
        const departureYear = this.refs.departureYear.value
        const arrivalDay = this.refs.arrivalDay.value
        const arrivalMonth = this.refs.arrivalMonth.value
        const arrivalYear = this.refs.arrivalYear.value

        if ( departureDay && departureMonth && departureYear &&
             arrivalDay && arrivalMonth && arrivalYear ) {

            if ( (daysInAMonth.indexOf(departureDay.toString()) ||
                daysInAMonth.indexOf(arrivalDay.toString())) <= (-1)) {

                callback("incorrectDateInput");
            } else {

                if ( (monthsInAYear.indexOf(departureMonth) ||
                    monthsInAYear.indexOf(arrivalMonth) ) <= (-1) ) {

                    callback("incorrectMonthInput");

                } else {

                    if (departureYear.match(fourDigits) && arrivalYear.match(fourDigits)) {

                        data["departureDate"]= departureMonth + " " + departureDay + " " + departureYear;
                        data["arrivalDate"]= arrivalMonth + " " + arrivalDay + " " + arrivalYear;

                        this.checkTimeInput(data, (response) => (callback(response)));

                    } else {

                        callback("incorrectYearInput");
                    }
                }
            }
        } else {
            callback("incomplete");
        }
    }

    checkTimeInput(data, callback) {

        const departureHour = parseInt(this.refs.departureHour.value, 10);
        const departureMinutes = parseInt(this.refs.departureMinutes.value, 10);
        const arrivalHour = parseInt(this.refs.arrivalHour.value, 10);
        const arrivalMinutes = parseInt(this.refs.arrivalMinutes.value, 10);

        if ( departureHour && departureMinutes &&
             arrivalHour && arrivalMinutes ) {

            if ( (Math.floor(departureHour/23) && Math.floor(arrivalHour/23)) === 0 ) {

                if ( (Math.floor(departureMinutes/59) && Math.floor(arrivalHour/59)) === 0 ) {

                    data["departureTime"] = departureHour + ":" + departureMinutes;
                    data["arrivalTime"] = arrivalHour + ":" + arrivalMinutes;

                    callback(data);

                } else {

                    callback("incorrectMinutes");
                }
            } else {

                callback("incorrectHour");
            }
        } else {
            callback("incomplete");
        }
    }

    saveDataToParentState(journeyData) {

        const saveJourneyData = this.props.saveJourneyData;
        saveJourneyData(journeyData);
    }

    render () {

        return (

            <div className="page data-collection-page form">

                <div className="form-block row">
                    <h4 className="form-block-title">DEPARTURE LOCATION:</h4>
                    <input className="form-input col-6" type="text" ref="departureCity" placeholder="CITY" />
                    <input className="form-input col-6" type="text" ref="departurePostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block row">

                    <h4 className="form-block-title">DEPARTURE DATE & TIME:</h4>

                        <div className="date-container col-6">
                            <input className="input-number" type="text" ref="departureDay" placeholder="DAY" />
                            <input className="input-number" type="text" ref="departureMonth" placeholder="MONTH" />
                            <input className="input-number" type="text" ref="departureYear" placeholder="YEAR" />
                        </div>
                        <div className="time-container col-6">
                            <input className="input-number" type="text" ref="departureHour" placeholder="HOUR" />
                            <input className="input-number" type="text" ref="departureMinutes" placeholder="MINUTES" />
                        </div>

                </div>

                <div className="form-block">
                    <h4 className="form-block-title">ARRIVAL LOCATION:</h4>
                    <input className="form-input col-6" type="text" ref="arrivalCity" placeholder="CITY" />
                    <input className="form-input col-6" type="text" ref="arrivalPostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <h4 className="form-block-title">ARRIVAL DATE & TIME:</h4>
                    <div className="">
                        <div className="date-container col-6">
                            <input className="input-number" type="text" ref="arrivalDay" placeholder="DAY" />
                            <input className="input-number" type="text" ref="arrivalMonth" placeholder="MONTH" />
                            <input className="input-number" type="text" ref="arrivalYear" placeholder="YEAR" />
                        </div>
                        <div className="time-container col-6">
                            <input className="input-number" type="text" ref="arrivalHour" placeholder="HOUR" />
                            <input className="input-number" type="text" ref="arrivalMinutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

            </div>
        );
    }
}

export default Journey;
