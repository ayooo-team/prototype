'use strict';

import React from 'react';

class Options extends React.Component {

    render () {

        return (
            <div className="radio-block">
                <img className={ "radio-block-image radio-block-image-" + this.props.blockTitle } src={ this.props.blockImage } />
                <h4 className="radio-block-title">{ this.props.blockTitle }</h4>
                <p className="radio-block-text">{ this.props.blockText }</p>
            </div>
        );
    }
}

export default Options;
