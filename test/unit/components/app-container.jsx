'use strict';

import React from 'react';
import tape from 'tape';

import { scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import AppContainer from '../../../src/js/components/app-container.jsx';


tape('AppContainer exists', (t) => {

    const rendered = shallow(<AppContainer />);

    t.equal(rendered.props().className, "app-container", 'AppContainer renders correctly');
    t.end();
});
