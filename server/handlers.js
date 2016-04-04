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

function getData (callback) {

    elasticsearch.search().then((result) => {

        var data = result.hits.hits.map((element) => {

            return element._source;
        });

        callback(data);
    }).catch((error) => {

        console.error("Error:", error.message);
    });
}

function toCSV (data) {

    if (typeof data !== 'string' && typeof data !== 'object') {

        throw new Error("Argument must be a string or an object");
    }

    if (typeof data === 'string') {

        data = JSON.parse(data);
    }
    
    if (!Array.isArray(data)) {

        data = [data];
    }

	var headers = Object.keys(data[0]);
	var topRow = headers.join(",") + "\r\n";

    var result = data.reduce(function (previous, datapoint, index) {

        headers.forEach(function (header, headerIndex) {

            previous += datapoint[header];
            if (headerIndex === headers.length - 1) {

                previous += "\r\n";
            } else {
                previous += ",";
            }
        });

        return previous;
    }, topRow);

    return result;
}

module.exports = {

    addDeliveryRequest: addDeliveryRequest,
    getData: getData,
    toCSV: toCSV
};
