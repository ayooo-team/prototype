'use strict';

import React from 'react';
import Firebase from 'firebase';

class UserDetails extends React.Component {

    constructor (props) {

        super();

        this.checkAuthState();
        this.getUserProfile();

        this.checkAuthState = this.checkAuthState.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    checkAuthState () {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? console.log("user logged in") : window.location="/";
    }

    getUserProfile (firebaseApp) {

        const userId = JSON.parse(localStorage.getItem('firebase:session::ayooo')).uid;
        const firebaseUserProfile = new Firebase("https://ayooo.firebaseio.com/users/" + userId);

        firebaseUserProfile.once('value', (profileSnapshot) => {

            const userProfile = profileSnapshot.val();

            if (userProfile["name"] ) {

                this.setState({
                    savedName: userProfile["name"],
                    savedAge: userProfile["age"],
                    savedProfession: userProfile["profession"],
                    savedNationality: userProfile["nationality"],
                    savedMobileNumber: userProfile["mobileNumber"]
                })

            } else {

                console.log("no state set");
            }

        });

    }

    getFormData () {
        event.preventDefault();

        const userDetails = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            profession: this.refs.profession.value,
            nationality: this.refs.nationality.value,
            mobileNumber: this.refs.mobileNumber.value
        };

        this.saveUserDetails(userDetails);
    }

    saveUserDetails (userDetails) {

        const userId = JSON.parse(localStorage.getItem('firebase:session::ayooo')).uid;
        const firebaseUserDetails = new Firebase("https://ayooo.firebaseio.com/users/" + userId);
        firebaseUserDetails.update(userDetails);

        window.location = this.props.pageType + "/confirm";
    }

    render () {

        return this.state ? (
            <div className="page">
                <h3>
                    It seems we're missing a few bits of information from you...
                    To make a post, please fill in the empty fields.
                </h3>

                <h4>USER DETAILS</h4>

                <div>
                    <h4>Name</h4>
                    <input type="text" ref="name" defaultValue={this.state.savedName} />
                </div>
                <div>
                    <h4>Age</h4>
                    <input type="text" ref="age" defaultValue={this.state.savedAge} />
                </div>
                <div>
                    <h4>Profession</h4>
                    <input type="text" ref="profession" defaultValue={this.state.savedProfession} />
                </div>
                <div>
                    <h4>Nationality</h4>
                    <input type="text" ref="nationality" defaultValue={this.state.savedNationality} />
                </div>
                <div>
                    <h4>Mobile Number</h4>
                    <input type="text" ref="mobileNumber" defaultValue={this.state.savedMobileNumber} />
                </div>

                <button onClick={ this.getFormData.bind(this) }>Submit</button>
            </div>
        ) : (
            <div className="page">
                <h3>
                    To ensure that our community is trustworthy,
                    we record information of every member's identity.
                    To make a post, please tell us who you are.
                </h3>

                <h4>USER DETAILS</h4>

                <div>
                    <h4>Name</h4>
                    <input type="text" ref="name"/>
                </div>
                <div>
                    <h4>Age</h4>
                    <input type="text" ref="age"/>
                </div>
                <div>
                    <h4>Profession</h4>
                    <input type="text" ref="profession"/>
                </div>
                <div>
                    <h4>Nationality</h4>
                    <input type="text" ref="nationality"/>
                </div>
                <div>
                    <h4>Mobile Number</h4>
                    <input type="text" ref="mobileNumber"/>
                </div>

                <button onClick={ this.getFormData.bind(this) }>Submit</button>
            </div>
        )
    }
};

export default UserDetails;
