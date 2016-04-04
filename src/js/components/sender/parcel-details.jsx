'use strict';

import React from 'react';
import GhostButton from '../ghost-button.jsx';

class ParcelDetails extends React.Component {

    render () {

        return (

            <div className="page form">

                  <div className="form-block">
                      <label className="form-block-title">PARCEL DETAILS:</label>
                      <input className="form-input" type="text" ref="parcelDescription" placeholder="List what is inside the parcel." />
                  </div>

                  <div className="form-block">
                    <label className="form-block-title">Weight:</label>
                    <input className="flex-item" type="text" ref="parcelWeight" />
                    <span className="flex-item" type="text">Kg</span>
                  </div>

                  <div className="form-block">
                      <label className="form-block-title">Size:</label>
                      <div className="form-input" type="text" ref="parcelSize" onClick={ this.tempSaveParcelDescriptionAndWeight }>{ this.props.parcelSize } >> </div>
                  </div>

                  <GhostButton onClick={ this.getFormData } buttonText="NEXT" />

              </div>
          )
    }

}

export default ParcelDetails
