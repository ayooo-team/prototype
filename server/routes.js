'use strict';

const path = require('path');
const elasticsearch = require('./db/client.js');

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
        handler: function (request, reply) {

            var data = request.payload;
            data.userID = request.query.userID;
            data.timestamp = Date.now();

            // elasticsearch.deleteIndex("ayooo")
            var result = elasticsearch.addDocument(
                request.query.type,
                data
            ).then( (result) => {

                reply(result);
            });
        }
    }
];
