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

        this.saveJourneyData = this.saveJourneyData.bind(this);
        this.saveLuggageData = this.saveLuggageData.bind(this);
        this.savePriceData = this.savePriceData.bind(this);
        this.attachActionsTo = this.attachActionsTo.bind(this);
    }

    saveJourneyData (journeyData) {
        console.log("save journey data");
        this.setState({
            journeyData
        });
    }

    saveLuggageData (luggageAllowanceData) {
        this.setState({
            luggageAllowanceData
        });
    }

    savePriceData (priceData) {
        this.setState({
            priceData
        });
    }

    attachActionsTo (component) {
        return React.cloneElement(component, {
          saveJourneyData: this.saveJourneyData,
          saveLuggageData: this.saveLuggageData,
          savePriceData: this.savePriceData
        });
    }

    render () {

        return (
            this.attachActionsTo(this.props.children)
        );
    }
}

export default TravelPost
