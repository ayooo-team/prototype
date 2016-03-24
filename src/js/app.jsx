'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import AppContainer from './components/app-container.jsx';


const routes = (
    <Route path="/" component={ AppContainer } />
);

ReactDOM.render(
    <Router history={ hashHistory }>
        { routes }
    </Router>,
    document.getElementsByClassName("content")[0]
);
