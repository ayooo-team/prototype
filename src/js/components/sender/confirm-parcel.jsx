'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ConfirmParcel extends React.Component {

    constructor(props) {

        super();
        this.checkUserProfileExists = this.checkUserProfileExists.bind(this);
        this.confirmPost = this.confirmPost.bind(this);
    }

    getUserID () {

        const storedInfo = localStorage.getItem("firebase:session::ayooo");
        return JSON.parse(storedInfo).uid;
    }

    checkUserProfileExists () {

        const userID = this.getUserID();

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/" + userID );

        firebaseApp.once('value', (profileSnapshot) => {

            const userProfile = profileSnapshot.val();

            ( userProfile["name"] && userProfile["age"] &&
            userProfile["profession"] && userProfile["nationality"] &&
            userProfile["mobileNumber"] ) ? this.confirmPost() : window.location="/#/send-post/user-info"
        });
    }

    confirmPost () {

        const userID = this.getUserID();


        let totalData = {
            timestamp: Date.now(),
            userID: userID,
            fromCity: this.props.pickUpData.fromCity,
            fromPostCode: this.props.pickUpData.fromPostCode,
            toCity: this.props.pickUpData.toCity,
            toPostCode: this.props.pickUpData.toPostCode,
            pickUpIdentity: this.props.pickUpData.pickUpIdentity,
            recipientIdentity: this.props.pickUpData.recipientIdentity,
            parcelDescription: this.props.parcelDetails.parcelDescription,
            parcelSize: this.props.parcelDetails.parcelSize,
            parcelWeight: this.props.parcelDetails.parcelWeight,
            requestedDate: this.props.requestedDate,
            price: this.props.priceData.price
        };

        $.ajax({
            method: 'POST',
            url: 'delivery?type=sender&userID=' + userID,
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

              <div className="page form">

                  <div className="form-block">
                      <label className="form-block-title">FROM:</label>
                      <p className="form-input-data">
                      { "City: " + this.props.pickUpData.fromCity }
                      </p>
                      <p className="form-input-data">
                      { "PostCode: " + this.props.pickUpData.fromPostCode }
                      </p>
                      <p className="form-input-data">
                      { "Person Picking Up: " + this.props.pickUpData.pickUpIdentity }
                      </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">TO:</label>
                      <p className="form-input-data">
                      { "City: " + this.props.pickUpData.toCity }
                      </p>
                      <p className="form-input-data">
                      { "PostCode: " + this.props.pickUpData.toPostCode }
                      </p>
                      <p className="form-input-data">
                      { "Person Recieving: " + this.props.pickUpData.recipientIdentity }
                      </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">PARCEL SIZE:</label>
                      <p className="form-input-data">{
                          "Description: " + this.props.parcelDetails.parcelDescription
                      } </p>
                      <p className="form-input-data">{
                          "Size: " + this.props.parcelSize.chosenOption
                      } </p>
                      <p>{
                          "Weight: " + this.props.parcelDetails.parcelWeight
                      } </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">ASKING PRICE:</label>
                      <p className="form-input-data">{
                          "Price(£): " + this.props.priceData.price
                      } </p>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">REQUESTED DATE:</label>
                      <p className="form-input-data">{
                          "Preferred date of delivery: " + this.props.requestedDate
                      } </p>
                  </div>

                  <GhostButton onClick={this.checkUserProfileExists} buttonText="CONFIRM" />

              </div>
        )
    }
}

export default ConfirmParcel
