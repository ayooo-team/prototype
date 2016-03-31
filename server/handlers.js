'use strict';

const elasticsearch = require('./db/client.js');

function addDeliveryRequest (request, reply) {

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

module.exports = {

    addDeliveryRequest: addDeliveryRequest
};
