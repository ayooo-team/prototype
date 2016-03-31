'use strict';

const path = require('path');
const elasticsearch = require('./db/client.js');

const filePaths = {
    build: path.resolve(__dirname, '../build'),
}

module.exports = [
    {
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: filePaths.build
            }
        }
    },
    {
        method: 'POST',
        path: '/delivery',
        handler: function (request, reply) {
            var result = elasticsearch.addDocument(request.payload);
            console.log('result!!' + JSON.stringify(result));
        }
    }
];
