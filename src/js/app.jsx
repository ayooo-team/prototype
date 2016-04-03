'use strict';

require('../scss/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AppContainer from './components/app-container.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import UserDetails from './components/save-user-details.jsx';
import PriceSuggestion from './components/price.jsx';
import ParcelSize from './components/parcel-size.jsx';
import Admin from './components/admin.jsx';

import SendPost from './components/sender/send-post.jsx';
import Sender from './components/sender/pickup.jsx';
import ParcelDetails from './components/sender/parcel-details.jsx';
import SetDeliveryDate from './components/sender/set-delivery-date.jsx';
import ConfirmParcel from './components/sender/confirm-parcel.jsx';


import TravelPost from './components/traveller/travel-post.jsx';
import Traveller from './components/traveller/journey.jsx';
import ConfirmTravel from './components/traveller/confirm-travel.jsx';

const routes = (
    <Route path="/" component={ AppContainer } >
        <IndexRoute component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/user-info" component={ UserDetails } />
        <Route path="/admin" component={ Admin } />

        <Route path="/send-post" component={ SendPost }>
            <IndexRoute component={ Sender } />
            <Route path="parcel-details" component={ ParcelDetails } />
            <Route path="parcel-size" component={ ParcelSize } />
            <Route path="price" component={ PriceSuggestion } />
            <Route path="set-delivery-date" component={ SetDeliveryDate } />
            <Route path="confirm" component={ ConfirmParcel } />
        </Route>

        <Route path="/travel-post" component={ TravelPost }>
            <IndexRoute component={ Traveller } />
            <Route path="parcel-size" component={ ParcelSize } />
            <Route path="price" component={ PriceSuggestion } />
            <Route path="confirm" component={ ConfirmTravel } />
        </Route>

    </Route>
);

ReactDOM.render(
    <Router history={ hashHistory }>
        { routes }
    </Router>,
    document.getElementsByClassName("content")[0]
);
