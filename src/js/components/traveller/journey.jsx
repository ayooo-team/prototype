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
            departureDay: this.refs.departureDay.value,
            departureMonth: this.refs.departureMonth.value,
            departureYear: this.refs.departureYear.value,
            departureHour: this.refs.departureHour.value,
            departureMinutes: this.refs.departureMinutes.value,

            arrivalCity: this.refs.arrivalCity.value,
            arrivalPostCode: this.refs.arrivalPostcode.value,
            arrivalDay: this.refs.arrivalDay.value,
            arrivalMonth: this.refs.arrivalMonth.value,
            arrivalYear: this.refs.arrivalYear.value,
            arrivalHour: this.refs.arrivalHour.value,
            arrivalMinutes: this.refs.arrivalMinutes.value,
        };

        this.checkInput(journeyData, (result) => {

            result ? (this.saveDataToParentState(journeyData), window.location="/#/travel-post/parcel-size") : alert("Please complete all fields.");
        });
    }

    checkInput (data, callback) {

        ( data["departureCity"] &&
          data["departurePostCode"] &&
          data["departureDay"] &&
          data["departureMonth"] &&
          data["departureYear"] &&
          data["departureHour"] &&
          data["departureMinutes"] &&
          data["arrivalCity"] &&
          data["arrivalPostCode"] &&
          data["arrivalDay"] &&
          data["arrivalMonth"] &&
          data["arrivalYear"] &&
          data["arrivalHour"] &&
          data["arrivalMinutes"] ) ? callback(true) : callback(false);
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
                            <input className="input-number" type="number" ref="departureDay" placeholder="DAY" />
                            <input className="input-number" type="number" min="1" max="12" ref="departureMonth" placeholder="MONTH" />
                            <input className="input-number" type="number" ref="departureYear" placeholder="YEAR" />
                        </div>
                        <div className="time-container col-6">
                            <input className="input-number" type="number" ref="departureHour" placeholder="HOUR" />
                            <input className="input-number" type="number" ref="departureMinutes" placeholder="MINUTES" />
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
                            <input className="input-number" type="number" ref="arrivalDay" placeholder="DAY" />
                            <input className="input-number" type="number" min="1" max="12" ref="arrivalMonth" placeholder="MONTH" />
                            <input className="input-number" type="number" ref="arrivalYear" placeholder="YEAR" />
                        </div>
                        <div className="time-container col-6">
                            <input className="input-number" type="number"  ref="arrivalHour" placeholder="HOUR" />
                            <input className="input-number" type="number" ref="arrivalMinutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

            </div>
        );
    }
}

export default Journey;
