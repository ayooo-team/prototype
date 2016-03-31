'use strict';

import React from 'react';
import GhostButton from './ghost-button.jsx';

class Sender extends React.Component {

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
        ( data["item"] &&
          data["size"] &&
          data["weight"] &&
          data["origin"] &&
          data["destination"] &&
          data["date"] &&
          data["price"] ) ? callback(true) : callback(false);
    }

    getFormData (event) {

        event.preventDefault();

        let data = {
            item: this.refs.item.value,
            size: this.getSelectedRadio(),
            weight: this.refs.weight.value,
            origin: this.refs.origin.value,
            destination: this.refs.destination.value,
            date: this.refs.date.value,
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
            url: "/delivery?type=sender&userID=" + userID,
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
              <h1 className="login-title">SEND A PACKAGE</h1>

              <div className="form-block">
                  <label className="form-label login-width-adjust">Item Description:</label>
                  <input className="form-input" type="text" ref="item" />
              </div>

              <div className="form-block">
                  <label className="form-label">Item Size:</label>
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
                  <label className="form-label">Item Weight:</label>
                  <input className="form-input" type="text" ref="weight" />
              </div>

              <div className="form-block">
                  <label className="form-label">Origin:</label>
                  <input className="form-input" type="text" ref="origin" />
              </div>

              <div className="form-block">
                  <label className="form-label">Destination:</label>
                  <input className="form-input" type="text" ref="destination" />
              </div>

              <div className="form-block">
                  <label className="form-label">Date to Deliver By:</label>
                  <input className="form-input" type="text" ref="date" />
              </div>

              <div className="form-block">
                  <label className="form-label">Maximum price you are willing to offer:</label>
                  <input className="form-input" type="text" ref="price" />
              </div>

              <GhostButton onClick={ this.getFormData } buttonText={ "SUBMIT" } />

          </div>
        );
    }
}

export default Sender;
