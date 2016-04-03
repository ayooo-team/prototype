'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class Journey extends React.Component {

    constructor() {

      super();
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

            <div className="page form">

                <div className="form-block">
                    <label className="form-block-title">DEPARTURE LOCATION:</label>
                    <input className="form-input" type="text" ref="departureCity" placeholder="CITY" />
                    <input className="form-input" type="text" ref="departurePostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title">DEPARTURE DATE & TIME:</label>
                    <div className="flex-container">
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="departureDay" placeholder="DAY" />
                            <input className="flex-item" type="text" ref="departureMonth" placeholder="MONTH" />
                            <input className="flex-item" type="text" ref="departureYear" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="departureHour" placeholder="HOUR" />
                            <input className="flex-item" type="text" ref="departureMinutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <div className="form-block">
                    <label className="form-block-title">ARRIVAL LOCATION:</label>
                    <input className="form-input" type="text" ref="arrivalCity" placeholder="CITY" />
                    <input className="form-input" type="text" ref="arrivalPostcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title">ARRIVAL DATE & TIME:</label>
                    <div className="flex-container">
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="arrivalDay" placeholder="DAY" />
                            <input className="flex-item" type="text" ref="arrivalMonth" placeholder="MONTH" />
                            <input className="flex-item" type="text" ref="arrivalYear" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="arrivalHour" placeholder="HOUR" />
                            <input className="flex-item" type="text" ref="arrivalMinutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData } buttonText="NEXT" />
            </div>
        )
    }
}

export default Journey
