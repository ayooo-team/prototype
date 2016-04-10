'use strict';

import React from 'react';
import classnames from 'classnames';
import LineBreak from './line-break.jsx';

class Options extends React.Component {

    constructor () {

        super();
    }

    render () {

        let radioClasses = classnames({
            "radio-row": true,
            "row": true
        });

        let imgClasses = classnames({
            "radio-selected-tick": true,
            "col-1": true,
            "display-none": (this.props.selectedRow !== this.props.blockTitle)
        });

        return (

            <div className={ radioClasses } id={ this.props.blockTitle } onClick={ this.props.onClick }>

                <div className="radio-image-wrapper col-2">
                    <img className="radio-image" src={ this.props.blockImage } />
                </div>

                <div className="description col-9">
                    <h4 className="radio-block-title" id={ this.props.blockTitle }>{ this.props.blockTitle }</h4>
                    <p className="radio-block-text" id={ this.props.blockTitle }>{ this.props.blockText }</p>
                </div>

                <img className={ imgClasses } id={ this.props.blockTitle } src="https://cloud.githubusercontent.com/assets/13470325/14233556/3e0f5e2c-f9c4-11e5-8337-17c162b678a1.png" />
            </div>
        );
    }
}

export default Options;
