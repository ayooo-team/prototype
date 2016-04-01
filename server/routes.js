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
        path: '/download',
        handler: function (request, reply) {

            var data = handlers.getData(function (data) {

                var sortedByTime = data.sort(function (a, b) {

                    return a.timestamp < b.timestamp;
                });

                var csvFile = handlers.toCSV(sortedByTime);
                
                reply(csvFile);
            });
        }
    }
];
