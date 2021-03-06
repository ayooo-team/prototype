'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ConfirmParcel extends React.Component {

    constructor(props) {

        super(props);

        this.checkAuthState((response) => {
            response === 'yes' ? ( this.checkProps((response) => {
                response === 'goBack' ? window.location=this.props.pageType + "/price" : console.log("all fields filled so far")
            })) : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.checkProps = this.checkProps.bind(this);
        this.checkUserProfileExists = this.checkUserProfileExists.bind(this);
        this.confirmPost = this.confirmPost.bind(this);
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
            timestamp:         Date.now(),
            userID:            userID,
            fromCity:          this.props.pickUpData.fromCity,
            fromPostCode:      this.props.pickUpData.fromPostCode,
            toCity:            this.props.pickUpData.toCity,
            toPostCode:        this.props.pickUpData.toPostCode,
            pickUpIdentity:    this.props.pickUpData.pickUpIdentity,
            recipientIdentity: this.props.pickUpData.recipientIdentity,
            parcelDescription: this.props.parcelDetails.parcelDescription,
            parcelSize:        this.props.parcelDetails.parcelSize,
            parcelWeight:      this.props.parcelDetails.parcelWeight,
            requestedDate:     this.props.requestedDate,
            price:             this.props.priceData.price
        };

        $.ajax({
            method: 'POST',
            url: 'delivery?type=sender&userID=' + userID,
            data: totalData,
            success: (response) => {
                response === 'ok' ?
                ( alert("Thank you! AYOOO will be in touch soon!"), window.location = "/#/dashboard" ) :
                alert("Oops, something happened! Please send your request again.");
            },
            error: (error) => {
                console.log(error);
                alert("There was a problem. Please send your request again.");
            }
        });
    }

    render () {

        return (

              <div className="page form">

                  <div className="form-block">
                      <h3 className="form-block-title">FROM:</h3>
                      <p className="form-input-data">
                          { "City: " + this.props.pickUpData.fromCity }
                      </p>
                      <p className="form-input-data">
                          { "Postcode: " + this.props.pickUpData.fromPostCode }
                      </p>
                      <p className="form-input-data">
                          { "Person Picking Up: " + this.props.pickUpData.pickUpIdentity }
                      </p>
                  </div>

                  <div className="form-block">
                      <h3 className="form-block-title">TO:</h3>
                      <p className="form-input-data">
                          { "City: " + this.props.pickUpData.toCity }
                      </p>
                      <p className="form-input-data">
                          { "Postcode: " + this.props.pickUpData.toPostCode }
                      </p>
                      <p className="form-input-data">
                          { "Person Receiving: " + this.props.pickUpData.recipientIdentity }
                      </p>
                  </div>

                  <div className="form-block">
                      <h3 className="form-block-title">PARCEL SIZE:</h3>
                      <p className="form-input-data">
                          { "Description: " + this.props.parcelDetails.parcelDescription }
                      </p>
                      <p className="form-input-data">
                          { "Size: " + this.props.parcelSize.chosenOption }
                      </p>
                      <p className="form-input-data">
                          { "Weight: " + this.props.parcelDetails.parcelWeight }
                      </p>
                  </div>

                  <div className="form-block">
                      <h3 className="form-block-title">ASKING PRICE:</h3>
                      <p className="form-input-data">
                          { "Price(£): " + this.props.priceData.price }
                      </p>
                  </div>

                  <div className="form-block">
                      <h3 className="form-block-title">REQUESTED DATE: </h3>
                      <p className="form-input-data">
                          { "Date(DD/MM/YYYY): " + this.props.requestedDate }
                      </p>
                  </div>

                  <GhostButton onClick={ this.checkUserProfileExists } buttonText="CONFIRM" />

              </div>
        )
    }
}

export default ConfirmParcel
