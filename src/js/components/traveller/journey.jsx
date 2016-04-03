'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class Journey extends React.Component {

    constructor () {
      super();

      this.submit = this.submit.bind(this);
    }

    submit () {

      const saveJourneyData = this.props.saveJourneyData;

      saveJourneyData("TEST");
    }

    render () {

        return (

            <div className="page form">

                <div className="form-block">
                    <label className="form-block-title">DEPARTURE LOCATION:</label>
                    <input className="form-input" type="text" ref="departure-city" placeholder="CITY" />
                    <input className="form-input" type="text" ref="departure-postcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title">DEPARTURE DATE & TIME:</label>
                    <div className="flex-container">
                        <div className="flex-wrapper">
                            <input className="flex-item" type="number" ref="departure-day" placeholder="DAY" />
                            <input className="flex-item" type="number" ref="departure-month" placeholder="MONTH" />
                            <input className="flex-item" type="number" ref="departure-year" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="number" ref="departure-hour" placeholder="HOUR" />
                            <input className="flex-item" type="number" ref="departure-minutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <div className="form-block">
                    <label className="form-block-title">ARRIVAL LOCATION:</label>
                    <input className="form-input" type="text" ref="arrival-city" placeholder="CITY" />
                    <input className="form-input" type="text" ref="arrival-postcode" placeholder="POSTCODE" />
                </div>

                <div className="form-block">
                    <label className="form-block-title">ARRIVAL DATE & TIME:</label>
                    <div className="flex-container">
                        <div className="flex-wrapper">
                            <input className="flex-item" type="number" ref="arrival-day" placeholder="DAY" />
                            <input className="flex-item" type="number" ref="arrival-month" placeholder="MONTH" />
                            <input className="flex-item" type="number" ref="arrival-year" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="number" ref="arrival-hour" placeholder="HOUR" />
                            <input className="flex-item" type="number" ref="arrival-minutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <GhostButton onClick={ this.submit } pageLink="travel-post/luggage-allowance" buttonText="NEXT" />
            </div>
        )
    }
}

export default Journey;
