'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class Traveller extends React.Component {

    constructor (props) {

        super();
        this.checkAuthState();

        this.getFormData = this.getFormData.bind(this);
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? console.log('user logged in') : window.location = "/#" ;
    }

    getSelectedRadio () {

        let allOptions = [
            this.refs.pocket,
            this.refs.small,
            this.refs.medium,
            this.refs.large
        ];

        let chosenRadio = allOptions.filter((option) => {
            return option.checked;
        });


        return chosenRadio.length > 0 ? chosenRadio[0].value : false;
    }

    checkInput (data, callback) {
        ( data["size"] &&
          data["weight"] &&
          data["origin"] &&
          data["destination"] &&
          data["departureDate"] &&
          data["arrivalDate"] &&
          data["price"] ) ? callback(true) : callback(false);
    }

    getFormData (event) {

        event.preventDefault();

        let data = {
            size: this.getSelectedRadio(),
            weight: this.refs.weight.value,
            origin: this.refs.origin.value,
            destination: this.refs.destination.value,
            departureDate: this.refs.departureDate.value,
            arrivalDate: this.refs.arrivalDate.value,
            price: this.refs.price.value,
        };

        this.checkInput(data, (result) => {

            result ? this.saveToDB(data) : alert("Please complete all fields.");
        });
    }

    getUserID () {

        const storage = localStorage.getItem("firebase:session::ayooo");

        return JSON.parse(storage).uid;
    }

    saveToDB (data) {

        const userID = this.getUserID();

        $.ajax({
            method: 'POST',
            url: "/delivery?type=traveller&userID=" + userID,
            data: data,
            success: function (reply) {
                console.log('SUCCESS: ' + JSON.stringify(reply));
            },
            error: function (error) {
                console.log('ERROR: ' + JSON.stringify(error));
            }
        });
    }

    render () {

        return(
          <div className="page form">
              <h1 className="login-title">DELIVER A PACKAGE</h1>

              <div className="form-block">
                  <label className="form-label">Item size restriction:</label>
                  <div className="form-query">
                      <input className="form-radio" type="radio" name="packageSize" value="Pocket" ref="pocket" />
                      Pocket
                  </div>
                  <div className="form-query">
                      <input className="form-radio" type="radio" name="packageSize" value="Small" ref="small" />
                      Small
                  </div>
                  <div className="form-query">
                      <input className="form-radio" type="radio" name="packageSize" value="Medium" ref="medium" />
                      Medium
                  </div>
                  <div className="form-query">
                      <input className="form-radio" type="radio" name="packageSize" value="Large" ref="large" />
                      Large
                  </div>
              </div>

              <div className="form-block">
                  <label className="form-label">Item weight restriction:</label>
                  <input className="form-input" type="text" ref="weight" />
              </div>

              <div className="form-block">
                  <label className="form-label">Origin of Travel:</label>
                  <input className="form-input" type="text" ref="origin" />
              </div>

              <div className="form-block">
                  <label className="form-label">Departure Time:</label>
                  <input className="form-input" type="text" ref="departureDate" />
              </div>

              <div className="form-block">
                  <label className="form-label">Destination of Travel:</label>
                  <input className="form-input" type="text" ref="destination" />
              </div>

              <div className="form-block">
                  <label className="form-label">Arrival Time:</label>
                  <input className="form-input" type="text" ref="arrivalDate" />
              </div>

              <div className="form-block">
                  <label className="form-label">Minimum asking price to deliver:</label>
                  <input className="form-input" type="text" ref="price" />
              </div>

              <GhostButton onClick={ this.getFormData } buttonText={ "SUBMIT" } />

          </div>
        );
    }
}

export default Traveller;
