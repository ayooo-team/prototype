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

        this.getCurrentPage = this.getCurrentPage.bind(this);

        this.state = {
            currentPage: 0,
            postDetails: {
                departureCity: "",
                departurePostCode: "",
                departureDate: "",
                departureTime: "",
                arrivalCity: "",
                arrivalPostCode: "",
                arrivalDate: "",
                arrivalTime: "",
            }
        };
    }

    getCurrentPage () {
        console.log('STATE' + pages[this.state.currentPage]);
        return <pages[this.state.currentPage] />;
    }

    render () {

        return (
            <div>
                { this.getCurrentPage() }
            </div>
        );
    }
}

export default TravelPost
