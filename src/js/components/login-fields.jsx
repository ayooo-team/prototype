'use strict';

import React from 'react';

class LoginFields extends React.Component {

    render () {

        return (
            <div className="login-fields">
                
                <div className="login-wrapper">

                    <div className="form-block">
                        <label className="col-12 form-label ">Email:</label>
                        <input className="col-12 form-input" id="login-email-input" type="text" ref="email" />

                        <label className="col-12 form-label">Password:</label>
                        <input className="col-12 form-input" id="login-password-input" type="password" ref="password" />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginFields;
