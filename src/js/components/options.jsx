'use strict';

import React from 'react';

class Options extends React.Component {

    render () {

        return (
            <div className="radio-block flex-container">
                <div className="radio-block-image-wrapper flex-item">
                    <img className={ "radio-block-image radio-block-image-" + this.props.blockTitle } src={ this.props.blockImage } />
                </div>
                <div className="description flex-item">
                    <h4 className="radio-block-title">{ this.props.blockTitle }</h4>
                    <p className="radio-block-ttle">{ this.props.blockText }</p>
                </div>
            </div>
        );
    }
}

export default Options;
