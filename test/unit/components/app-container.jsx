'use strict';

import React from 'react';
import tape from 'tape';

import { scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import AppContainer from '../../../src/js/components/app-container.jsx';


tape('AppContainer exists', (t) => {

    const rendered = mount(<AppContainer />);


    console.log(rendered.props());
    // t.equal(text, "Hey", 'They are the same');

    t.end();
});
