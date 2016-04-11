'use strict';

const elasticsearch = require('./db/client.js');

function addDeliveryRequest (request, reply) {

    var data = request.payload;
    if (!request.query.userID) {

        return new Error('userID not set');
    }
    if (!data) {

        return new Error('Payload to server was empty.');
    }
    console.log(data);
    data.userID = request.query.userID;

    const type = request.query.type || "type";

    // elasticsearch.deleteIndex("ayooo")
    var result = elasticsearch.addDocument(
        "type",
        data
    ).then( (result) => {

        reply(result);
    });
}

function getCSVFile (request, reply) {

    let type = request.query;
    console.log(type);

    var data = getData(type, function (data) {

        var sortedByTime = data.sort(function (a, b) {

            return a.timestamp < b.timestamp;
        });

        data.timestamp = Date(data.timestamp);
        console.log("new timestamp?", Date(data.timestamp));
        console.log("FINAL DATA",data);

        var csvFile = toCSV(sortedByTime);

        reply(csvFile);
    });
}

function getData (type, callback) {

    var options = {
        type: ''
    };

    elasticsearch.search().then((result) => {

        var data = result.hits.hits.map((element) => {

            // get userID from array or object:

            const firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/" + userID);

            firebaseApp.once('value', (profileSnapshot) => {
                const userProfile = profileSnapshot.val();
                element["userName"] = userProfile["name"];
                element["userEmail"] = userProfile["email"];
                // push/append to array or object before returning element (line 72)
                return element._source;
            });
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
    getCSVFile: getCSVFile,
    getData: getData,
    toCSV: toCSV
};
