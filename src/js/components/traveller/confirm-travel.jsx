'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ConfirmTravel extends React.Component {

    constructor(props) {

        super();
        this.confirmPost = this.confirmPost.bind(this);

        //CHECK IF USER PROFILE EXISTS ON FIREBASE
    }

    confirmPost () {

        //MAKE AJAX REQUEST TO SAVE DATA TO ESDB
        alert("Thank you! AYOOO will be in touch soon!");
    }

    render () {

        return (

              <div className="page form">

                  <div className="form-block">
                      <label className="form-block-title">DEPARTURE:</label>
                      <p className="form-input-data">
                      { "City: " + this.props.journeyData.departureCity }
                      </p>
                      <p className="form-input-data">
                      { "PostCode: " + this.props.journeyData.departurePostCode }
                      </p>
                      <p className="form-input-data">
                      { "Date(DD/MM/YYYY): " + this.props.journeyData.departureDay + "/" + this.props.journeyData.departureMonth + "/" + this.props.journeyData.departureYear }
                      </p>
                      <p className="form-input-data">
                      { "Time(HH:MM): " + this.props.journeyData.departureHour + ":" + this.props.journeyData.departureMinutes }
                      </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">ARRIVAL:</label>
                      <p className="form-input-data">
                      { "City: " + this.props.journeyData.arrivalCity }
                      </p>
                      <p className="form-input-data">
                      { "PostCode: " + this.props.journeyData.arrivalPostCode }
                      </p>
                      <p className="form-input-data">
                      { "Date(DD/MM/YYYY): " + this.props.journeyData.arrivalDay + "/" + this.props.journeyData.arrivalMonth + "/" + this.props.journeyData.arrivalYear }
                      </p>
                      <p className="form-input-data">
                      { "Time(HH:MM): " + this.props.journeyData.arrivalHour + ":" + this.props.journeyData.arrivalMinutes }
                      </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">LUGGAGE ALLOWANCE:</label>
                      <p className="form-input-data">{
                          "Size: " + this.props.parcelSize.chosenOption
                      } </p>
                      <p>{
                          "Weight: " + this.props.parcelSize.weightAllowance
                      } </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">ASKING PRICE:</label>
                      <p className="form-input-data">{
                          "Price(£): " + this.props.priceData.price
                      } </p>
                  </div>

                  <GhostButton onClick={this.confirmPost} buttonText="CONFIRM" />

              </div>
        )
    }
}

export default ConfirmTravel
