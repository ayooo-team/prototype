'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ConfirmTravel extends React.Component {

    checkAllInputFieldsComplete () {

        console.log('input fields complete ? submitToDB: no');
    }

    render () {

        return (

              <div className="page form">

                  <div className="form-block">
                      <label className="form-block-title">DEPARTURE LOCATION:</label>
                      <span className="form-input-data"></span>
                  </div>

                  <GhostButton onClick={this.checkAllInputFieldsComplete} buttonText="CONFIRM" />
              </div>
        )
    }
}

export default ConfirmTravel
