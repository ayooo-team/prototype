'use strict';

const path = require('path');
const handlers = require('./handlers.js');

const filePaths = {
    build: path.resolve(__dirname, '../build'),
};
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
        handler: handlers.addDeliveryRequest
    },
    {
        method: 'GET',
        path: '/get-data',
        handler: function (request, reply) {
            
            var data = handlers.getData(function (data) {

                reply(handlers.toCSV(data));
            });
        }
    }
];
