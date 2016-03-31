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
    },
    {
        method: 'POST',
        path: '/delivery',
        handler: function (request, reply) {

            console.log(request.payload);
            console.log(request.params);
        }
    }
];
