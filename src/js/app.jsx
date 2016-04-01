'use strict';

require('../scss/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AppContainer from './components/app-container.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import Sender from './components/sender/pickup.jsx';
import Traveller from './components/traveller/journey.jsx';
import UserDetails from './components/save-user-details.jsx';
import Space from './components/traveller/luggage-allowance.jsx';
import ConfirmTravel from './components/traveller/confirm-travel.jsx';

const routes = (
    <Route path="/" component={ AppContainer } >
        <IndexRoute component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/pickup" component={ Sender } />
        <Route path="/user-info" component={ UserDetails } />
        <Route path="/journey" component={ Traveller } />
        <Route path="/luggage-allowance" component={ Space } />
        <Route path="/confirm-travel" component={ ConfirmTravel } />
    </Route>
);

ReactDOM.render(
    <Router history={ hashHistory }>
        { routes }
    </Router>,
    document.getElementsByClassName("content")[0]
);
