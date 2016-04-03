'use strict';

import React from 'react';
import Page1 from './journey.jsx';
import Page2 from './luggage-allowance.jsx';
import Page3 from '../price.jsx';
import Page4 from './confirm-travel.jsx';

const pages = [Page1, Page2, Page3, Page4];

class TravelPost extends React.Component {

    constructor (props) {
        super();

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
          savePriceData: this.createComponentDataSaverFor("priceData")
        });
    }

    render () {

        return (
            this.attachActionsTo(this.props.children)
        );
    }
}

export default TravelPost
