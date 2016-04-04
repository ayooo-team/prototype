'use strict';

require('../scss/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AppContainer from './components/app-container.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import Sender from './components/sender/pickup.jsx';
import Journey from './components/traveller/journey.jsx';
import UserDetails from './components/user-details.jsx';
import LuggageAllowance from './components/traveller/luggage-allowance.jsx';
import ConfirmTravel from './components/traveller/confirm-travel.jsx';
import PriceSuggestion from './components/price.jsx';
import TravelPost from './components/traveller/travel-post.jsx';
import Admin from './components/admin.jsx';

const routes = (
    <Route path="/" component={ AppContainer } >
        <IndexRoute component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/pickup" component={ Sender } />
        <Route path="/user-details" component={ UserDetails } />
        <Route path="/travel-post" component={ TravelPost }>
            <IndexRoute component={ Journey } />
            <Route path="luggage-allowance" component={ LuggageAllowance } />
            <Route path="confirm-travel" component={ ConfirmTravel } />
            <Route path="price" component={ PriceSuggestion } />
        </Route>
        <Route path="/price" component={ PriceSuggestion } />
        <Route path="/admin" component={ Admin } />
    </Route>
);

ReactDOM.render(
    <Router history={ hashHistory }>
        { routes }
    </Router>,
    document.getElementsByClassName("content")[0]
);
