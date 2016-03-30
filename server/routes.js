'use strict';

const Path = require('path');

module.exports = [
    {
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'build')
            }
        }
    }
]
