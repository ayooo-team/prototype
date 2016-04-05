'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ConfirmTravel extends React.Component {

    constructor (props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ? window.location=this.props.pageType + "/price" : console.log("all fields filled so far")
            })) : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);
        this.confirmPost = this.confirmPost.bind(this);
        this.getUserID = this.getUserID.bind(this);
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
    }

    checkProps (callback) {

        this.props.priceData === "default" ? callback('goBack') : callback('ok');
    }

    getUserID () {
        const storage = localStorage.getItem("firebase:session::ayooo");

        return JSON.parse(storage).uid;
    }

    checkUserProfileExists () {

        const userId = this.getUserID();

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/" + userId );

        firebaseApp.once('value', (profileSnapshot) => {

            const userProfile = profileSnapshot.val();

            ( userProfile["name"] && userProfile["age"] &&
            userProfile["profession"] && userProfile["nationality"] &&
            userProfile["mobileNumber"] ) ? this.confirmPost(userId) : window.location="/#/travel-post/user-info"
        });
    }

    confirmPost (userId) {

        let totalData = {
            timestamp: Date.now(),
            userID: userId,
            departureCity: this.props.journeyData.departureCity,
            departurePostCode: this.props.journeyData.departurePostCode,
            departureDate: this.props.journeyData.departureDate,
            departureTime: this.props.journeyData.departureTime,
            arrivalCity: this.props.journeyData.arrivalCity,
            arrivalPostCode: this.props.journeyData.arrivalPostCode,
            arrivalDate: this.props.journeyData.arrivalDate,
            arrivalTime: this.props.journeyData.arrivalTime,
            parcelSize: this.props.parcelSize.chosenOption,
            parcelWeight: this.props.parcelSize.parcelWeight,
            price: this.props.priceData.price
        };

        $.ajax({
            method: 'POST',
            url: 'delivery?type=traveller&userID=' + userID,
            data: totalData,
            success: (data) => {

                alert("Thank you! AYOOO will be in touch soon!");

                window.location = "/#/dashboard";
            },
            error: () => {
                alert("There was a problem. Please send your request again.");
            }
        });
    }

    render () {

        return (

            <div className="data-collection-page form">

              <div className="form-block">
                  <label className="form-block-title">DEPARTURE:</label>
                  <p className="form-input-data">
                      { "City: " + this.props.journeyData.departureCity }
                  </p>
                  <p className="form-input-data">
                      { "PostCode: " + this.props.journeyData.departurePostCode }
                  </p>
                  <p className="form-input-data">
                      { "Date(DD/MM/YYYY): " + this.props.journeyData.departureDate }
                  </p>
                  <p className="form-input-data">
                      { "Time(HH:MM): " + this.props.journeyData.departureTime }
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
                      { "Date(DD/MM/YYYY): " + this.props.journeyData.arrivalDate }
                  </p>
                  <p className="form-input-data">
                      { "Time(HH:MM): " + this.props.journeyData.arrivalTime }
                  </p>
              </div>

              <div className="form-block">
                  <label className="form-block-title">LUGGAGE ALLOWANCE:</label>
                  <p className="form-input-data">
                      { "Size: " + this.props.parcelSize.chosenOption }
                  </p>
                  <p>
                      { "Weight: " + this.props.parcelSize.parcelWeight }
                  </p>
              </div>

              <div className="form-block">
                  <label className="form-block-title">ASKING PRICE:</label>
                  <p className="form-input-data">
                      { "Price(£): " + this.props.priceData.price }
                  </p>
              </div>

              <GhostButton onClick={this.confirmPost} buttonText="CONFIRM" />

            </div>
        );
    }
}

export default ConfirmTravel;
