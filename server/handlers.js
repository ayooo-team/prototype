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

function getData (request, reply) {

    elasticsearch.search().then((result) => {

        var data = result.hits.hits;

        var newResult = data.map((element) => {
            // console.log(element);
            return element._source;
        });

        reply(JSON.stringify(newResult, null, 4));
    });
}

module.exports = {

    addDeliveryRequest: addDeliveryRequest,
    getData: getData
};
