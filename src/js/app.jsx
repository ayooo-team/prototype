'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AppContainer from './components/app-container.jsx';
import Login from './components/login.jsx';


const routes = (
    <Route path="/" component={ AppContainer} >
        <IndexRoute component={ Login } />
    </Route>
);

ReactDOM.render(
    <Router history={ hashHistory }>
        { routes }
    </Router>,
    document.getElementsByClassName("content")[0]
);
