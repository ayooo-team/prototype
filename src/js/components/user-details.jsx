'use strict';

import React from 'react';
import Firebase from 'firebase';
import classnames from 'classnames';
import GhostButton from './ghost-button.jsx';

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

        let leftColumn = classnames(
            "form-block-title",
            "label",
            "col-4"
        );
        let rightColumn = classnames(
            "col-6"
        );

        return (
            <div className="page data-collection-page">
                <h1>User Details</h1>

                <div className="user-details">
                    <div className="form-block row">
                        <h4 className={ leftColumn }>Name</h4>
                        <input className={ rightColumn } type="text" ref="name"/>
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Age</h4>
                        <input className={ rightColumn } type="text" ref="age"/>
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Profession</h4>
                        <input className={ rightColumn } type="text" ref="profession"/>
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Nationality</h4>
                        <input className={ rightColumn } type="text" ref="nationality"/>
                    </div>
                </div>



                <GhostButton onClick={ this.getFormData.bind(this) } buttonText="Submit" />
            </div>
        );
    }
};

export default UserDetails;
