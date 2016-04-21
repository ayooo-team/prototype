'use strict';

import React from 'react';
import Firebase from 'firebase';
import classnames from 'classnames';
import GhostButton from './ghost-button.jsx';

class UserDetails extends React.Component {

    constructor (props) {

        super();

        this.checkAuthState((response) => {
            response === 'yes' ? this.getUserProfile() : window.location = "/"
        });

        this.checkAuthState = this.checkAuthState.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    checkAuthState (callback) {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/");
        const isUserAuthenticated = firebaseApp.getAuth();
        isUserAuthenticated ? callback('yes') : callback('no');
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

        let leftColumn = classnames(
            "form-block-title",
            "label",
            "col-12"
        );
        let rightColumn = classnames(
            "col-12"
        );

        return this.state ? (
            <div className="user-details-page data-collection-page">

                <h1>USER DETAILS</h1>
                <p>
                    It seems we're still missing a few bits of information from you...
                    To make a post, please fill in the empty fields.
                </p>
                <div>
                    <h4 className={ leftColumn }>Name</h4>
                    <input className={ rightColumn } type="text" ref="name" defaultValue={ this.state.savedName } />
                </div>
                <div className="user-details">

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Age</h4>
                        <input className={ rightColumn } type="text" ref="age" defaultValue={ this.state.savedAge }/>
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Profession</h4>
                        <input className={ rightColumn } type="text" ref="profession" defaultValue={ this.state.savedProfession } />
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Nationality</h4>
                        <input className={ rightColumn } type="text" ref="nationality" defaultValue={ this.state.savedNationality }/>
                    </div>

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Mobile Number</h4>
                        <input className={ rightColumn } type="text" ref="mobileNumber" defaultValue={ this.state.savedMobileNumber }/>
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData.bind(this) } buttonText="Submit" />
            </div>
        ) : (
            <div className="user-details-page data-collection-page">


                <h1>USER DETAILS</h1>

                <p>
                    To ensure that our community is trustworthy,
                    we record information of every member's identity.
                    To make a post, please tell us who you are.
                </p>

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

                    <div className="form-block row">
                        <h4 className={ leftColumn }>Mobile Number</h4>
                        <input className={ rightColumn } type="text" ref="mobileNumber" />
                    </div>
                </div>

                <GhostButton onClick={ this.getFormData.bind(this) } buttonText="Submit" />
            </div>
        )
    }
};

export default UserDetails;
