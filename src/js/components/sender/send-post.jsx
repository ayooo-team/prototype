'use strict';

import React from 'react';

class SendPost extends React.Component {

    constructor (props) {

        super();

        this.state = {
            type: "send",
            pageType: "/#send-post",
            pricePageDescription: "What is the maximum price you are willing to pay?",
            pickUpData: "default",
            parcelSize: "default",
            parcelDetails: "default",
            requestedDate: "default",
            priceData: "default"
        }

        this.createComponentDataSaverFor = this.createComponentDataSaverFor.bind(this);
        this.attachActionsTo = this.attachActionsTo.bind(this);
    }

    createComponentDataSaverFor (formName) {

        return (formData) => {

          this.setState({
              [formName]: formData
          })
        }
    }

    attachActionsTo (component) {

        return React.cloneElement(component, {

            type: this.state.type,
            pageType: this.state.pageType,
            pricePageDescription: this.state.pricePageDescription,
            savePickUpData: this.createComponentDataSaverFor("pickUpData"),
            saveParcelDetails: this.createComponentDataSaverFor("parcelDetails"),
            saveParcelSize: this.createComponentDataSaverFor("parcelSize"),
            saveRequestedDate: this.createComponentDataSaverFor("requestedDate"),
            savePriceData: this.createComponentDataSaverFor("priceData"),
            pickUpData: this.state.pickUpData,
            parcelDetails: this.state.parcelDetails,
            parcelSize: this.state.parcelSize,
            requestedDate: this.state.requestedDate,
            priceData: this.state.priceData
        });
    }

    render () {

        return (
            this.attachActionsTo(this.props.children)
        );
    }
}

export default SendPost;
