'use strict';

import React from 'react';

class Options extends React.Component {

    constructor () {

        super();
    }

    render () {

        return (

            <div className="radio-row row" id={ this.props.blockTitle } onClick={ this.props.onClick }>

                <div className="radio-image-wrapper col-2">
                    <img className={ "radio-image radio-block-image-" + this.props.blockTitle } src={ this.props.blockImage } />
                </div>

                <div className="description col-9">
                    <h4 className="radio-block-title" id={ this.props.blockTitle }>{ this.props.blockTitle }</h4>
                    <p className="radio-block-text" id={ this.props.blockTitle }>{ this.props.blockText }</p>
                </div>

                <img className="radio-selected-tick col-1" id={ this.props.blockTitle } src="https://cloud.githubusercontent.com/assets/13470325/14233556/3e0f5e2c-f9c4-11e5-8337-17c162b678a1.png" />
            </div>
        );
    }
}

export default Options;
