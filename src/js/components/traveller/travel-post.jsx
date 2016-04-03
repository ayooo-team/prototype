'use strict';

import React from 'react';

class TravelPost extends React.Component {

    constructor (props) {
        super();

        this.state = {
          pricePage: {
            pricePageDescription: "What is the minimum ",
            confirmationPageLink: "/travel-post/confirm-travel"
          },
          formData: {}
        }

        this.createComponentDataSaverFor = this.createComponentDataSaverFor.bind(this);
        this.attachActionsTo = this.attachActionsTo.bind(this);
    }

    createComponentDataSaverFor (formName) {

        return (formData) => {

            this.setState({
                formData : {
                    [formName]: formData
                }
            })
        }
    }

    attachActionsTo (component) {

        return React.cloneElement(component, {

          saveJourneyData: this.createComponentDataSaverFor("journeyData"),
          saveLuggageData: this.createComponentDataSaverFor("luggageData"),
          savePriceData: this.createComponentDataSaverFor("priceData"),
          formData: this.state.formData,
          confirmationPageLink: this.state.confirmationPageLink
        });
    }

    render () {

        return (
            this.attachActionsTo(this.props.children)
        );
    }
}

export default TravelPost
