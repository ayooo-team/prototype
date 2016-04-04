'use strict';

import React from 'react';
import Firebase from 'firebase';

class UserDetails extends React.Component {

    constructor (props) {

        super();
        this.checkAuthState();
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? console.log(JSON.stringify(isUserAuthenticated)) : console.log('user not logged in');
    }

    getFormData () {
        event.preventDefault();

        const userDetails = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            profession: this.refs.profession.value,
            nationality: this.refs.nationality.value
        };

        console.log(userDetails);
        this.saveUserDetails(userDetails);
    }

    saveUserDetails (userDetails) {

        console.log("Inside saveUserDetails");
        const userId = JSON.parse(localStorage.getItem('firebase:session::ayooo')).uid;
        const firebaseUserDetails = new Firebase("https://ayooo.firebaseio.com/users/" + userId);
        firebaseUserDetails.update(userDetails);
    }

    render () {

        return (
            <div className="page">
                <h1>User Details</h1>

                <div>Name<input type="text" ref="name"/></div>
                <div>Age<input type="text" ref="age"/></div>
                <div>Profession<input type="text" ref="profession"/></div>
                <div>Nationality<input type="text" ref="nationality"/></div>

                <button onClick={ this.getFormData.bind(this) }>Submit</button>
            </div>
        );
    }
};

export default UserDetails;
