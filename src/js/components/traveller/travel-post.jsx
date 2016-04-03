'use strict';

import React from 'react';

class TravelPost extends React.Component {

    constructor (props) {
        super();

        this.state = {
          type: "travel",
          pageType: "/#travel-post",
          pricePageDescription: "What is the minimum price you would make a delivery for?",
          journeyData: "default",
          parcelSize: "default",
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
          saveJourneyData: this.createComponentDataSaverFor("journeyData"),
          saveParcelSize: this.createComponentDataSaverFor("parcelSize"),
          savePriceData: this.createComponentDataSaverFor("priceData"),
          journeyData: this.state.journeyData,
          parcelSize: this.state.parcelSize,
          priceData: this.state.priceData
        });
    }

    render () {

        return (
            this.attachActionsTo(this.props.children)
        );
    }
}

export default TravelPost
