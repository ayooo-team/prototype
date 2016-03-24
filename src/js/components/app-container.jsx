'use strict';

import React from 'react';

class AppContainer extends React.Component {

    render () {

        return (
            <div>
                <h1>This is the app container</h1>
                { this.props.children }
            </div>
        );
    }
};

export default AppContainer;
