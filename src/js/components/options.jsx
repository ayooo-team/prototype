'use strict';

import React from 'react';

class Options extends React.Component {

    constructor () {

        super();
    }

    render () {

        return (
            <div className="radio-block" id={ this.props.blockTitle } onClick={ this.props.onClick }>
                <img className={ "radio-block-image radio-block-image-" + this.props.blockTitle } id={ this.props.blockTitle } src={ this.props.blockImage } />
                <h4 className="radio-block-title" id={ this.props.blockTitle }>{ this.props.blockTitle }</h4>
                <p className="radio-block-text" id={ this.props.blockTitle }>{ this.props.blockText }</p>
                <img className="radio-selected-tick" id={ this.props.blockTitle } src="https://cloud.githubusercontent.com/assets/13470325/14233556/3e0f5e2c-f9c4-11e5-8337-17c162b678a1.png" />
            </div>
        );
    }
}

export default Options;
