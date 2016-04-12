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

function deleteIndex (indexName) {

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

function searchDatabaseFor () {

    client.search({
        index: indexName
    }, function (error, response) {
        return error ? callback("notOk") : callback("ok");
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
