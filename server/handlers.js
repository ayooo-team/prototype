'use strict';

const elasticsearch = require('./db/client.js');
const Firebase = require('firebase');

function addDeliveryRequest (request, reply) {

    var data = request.payload;

    if (!request.query.userID) {

        return new Error('userID not set');
    }
    if (!data) {

        return new Error('Payload to server was empty.');
    }

    var userID = request.query.userID;
    var firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/" + userID);

    firebaseApp.once('value').then((userData) => {

        var type = request.query.type;
        data.customerName = userData.val().name;
        data.customerEmail = userData.val().email;
        data.timestamp = Date(Date.now());

        // elasticsearch.deleteIndex("ayooo", (response) => {
        //     console.log("@@@@@@@@", response);
        // });
        elasticsearch.addDocument(type, data, (response) => {
            reply(response);
        });
    });
}

function getCSVFile (request, reply) {

    let type = request.query;

    var data = getData(type, (data) => {

        var sortedByTime = data.sort(function (a, b) {

            return a.timestamp < b.timestamp;
        });

        var csvFile = toCSV(sortedByTime);
        reply(csvFile);
    });
}

function getData (query, callback) {

    var requestedType = query.type;
    elasticsearch.searchDatabaseFor(requestedType, (result) => {

        if (!result) {
            callback("no result from elasticsearch");
        } else {
            var data = result["hits"]["hits"];
            var cleanedData = data.map((element) => {
                return element._source;
            });
            callback(cleanedData);
        }
    });
}

function getUserProfile (dataArray, callback) {

    // for each bit of data
    // get USERID
    // go to firebaseio
    // get email and username
    // add to
    // var result = [];


    dataArray.forEach((ayoooRequest, index) => {

        const firebaseApp = new Firebase("https://ayooo.firebaseio.com/users/");

        firebaseApp.once('value')
            .then((snapshot) => {

                snapshot.forEach((child) => {

                    if (child.key() === ayoooRequest.userID) {

                        var emailAddress = child.val().email;
                        var name = child.val().name;

                        ayoooRequest[index].customerEmail = child.val().email;
                        ayoooRequest[index].customerName = child.val().name;
                        console.log(ayoooRequest[index]);
                        return true;
                    }
                })
            })

            // console.log(index);
            // if (index + 1 === dataArray.length) {
            //
            //     console.log(dataArray);
            // }
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
