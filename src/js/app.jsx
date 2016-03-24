'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import AppContainer from './components/app-container.jsx';


ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer } />
    </Router>,
    document.getElementsByClassName("content")[0]
);
