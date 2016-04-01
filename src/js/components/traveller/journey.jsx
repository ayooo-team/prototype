'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class Journey extends React.Component {

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
                            <input className="flex-item" type="text" ref="departure-day" placeholder="DAY" />
                            <input className="flex-item" type="text" ref="departure-month" placeholder="MONTH" />
                            <input className="flex-item" type="text" ref="departure-year" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="departure-hour" placeholder="HOUR" />
                            <input className="flex-item" type="text" ref="departure-minutes" placeholder="MINUTES" />
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
                            <input className="flex-item" type="text" ref="arrival-day" placeholder="DAY" />
                            <input className="flex-item" type="text" ref="arrival-month" placeholder="MONTH" />
                            <input className="flex-item" type="text" ref="arrival-year" placeholder="YEAR" />
                        </div>
                        <div className="flex-wrapper">
                            <input className="flex-item" type="text" ref="arrival-hour" placeholder="HOUR" />
                            <input className="flex-item" type="text" ref="arrival-minutes" placeholder="MINUTES" />
                        </div>
                    </div>
                </div>

                <GhostButton pageLink="/luggage-allowance" buttonText="NEXT" />
            </div>
        )
    }
}

export default Journey
