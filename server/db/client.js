'use strict';

var elasticsearch = require('elasticsearch');
var connectionToElasticSearch = process.env.SEARCHBOX_SSL_URL || 'localhost:9200';

var client = new elasticsearch.Client({
    host: connectionToElasticSearch,
    log: 'error'
});

var indexName = "ayooo";

function initIndex () {

    client.indices.create({
        index: indexName
    }, function (error, response) {
        return error ? callback("notOk") : callback("ok");
    });
}

function deleteIndex (indexName, callback) {

    client.indices.delete({
        index: indexName
    }, function (error, response) {
        return error ? callback("notOk") : callback("ok");
    });
}

function indexExists () {

    client.indices.exists({
        index: indexName
    }, function (error, response) {
        return error ? callback("notOk") : callback("ok");
    });
}

function searchDatabaseFor (type, callback) {

    client.search({
        index: indexName,
        type: type,
        size: '10000'
    }, function (error, response) {
        if (error) {
            var errorMessage = "errorFromElasticSearch: " + error;
            callback(errorMessage);
        } else {
            var data = response["hits"]["hits"];
            if ( data === '[]' ) {
                callback("emptyArray");
            } else {
                callback(response);
            }
        }
    });
}

function addDocument (type, payload, callback) {

    client.create({
        index: indexName,
        type: type,
        body: payload
    }, function (error, response) {
        return error ? callback("notOk") : callback("ok");
    });
}

module.exports = {
     addDocument: addDocument,
     searchDatabaseFor: searchDatabaseFor,
     initIndex: initIndex,
     deleteIndex: deleteIndex,
     indexExists: indexExists
};
