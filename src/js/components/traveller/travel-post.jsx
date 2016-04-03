'use strict';

import React from 'react';

class TravelPost extends React.Component {

    constructor (props) {
        super();

        this.state = {
          pricePage: {
            pricePageDescription: "What is the minimum price you would make a delivery for?",
            confirmationPageLink: "/#travel-post/confirm-travel"
          },
          journeyData: "default",
          luggageData: "default",
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

          saveJourneyData: this.createComponentDataSaverFor("journeyData"),
          saveLuggageData: this.createComponentDataSaverFor("luggageData"),
          savePriceData: this.createComponentDataSaverFor("priceData"),
          pricePage: this.state.pricePage,
          journeyData: this.state.journeyData,
          luggageData: this.state.luggageData,
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
