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

function getData (request, reply, callback) {

    elasticsearch.search().then((result) => {

        var data = result.hits.hits;

        var res =  data.map((element) => {
            // console.log(element);
            return element._source;
        });

        callback(res);
    });
}

function toCSV (data) {

    if (typeof data === 'string') {

        data = JSON.parse(data);
    }

	var headers = Object.keys(data[0]);
	var topRow = headers.join(",") + "\r\n";

    var result = data.reduce(function (previous, datapoint, index) {


        for (var i = 0; i < headers.length; i++) {

            previous += datapoint[headers[i]];

            if (index === topRow.length - 1) {

                previous += "\r\n";
            } else {
                previous += ",";
            }
        }

        return previous;
    }, topRow);

    return result;
}

module.exports = {

    addDeliveryRequest: addDeliveryRequest,
    getData: getData,
    toCSV: toCSV
};
