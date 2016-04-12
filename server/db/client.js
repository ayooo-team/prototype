'use strict';

var elasticsearch = require('elasticsearch');
var connectionToElasticSearch = process.env.SEARCHBOX_SSL_URL || 'localhost:9200';

var client = new elasticsearch.Client({
    host: connectionToElasticSearch,
    log: 'error'
});

var indexName = "ayooo";

function initIndex () {

    return client.indices.create({
        index: indexName
    }, function (error, response) {
        console.log('RESPONSE', response);
        console.log('ERROR', error);
    });
}

function deleteIndex (indexName) {

    return client.indices.delete({
        index: indexName
    }, function (error, response) {
        console.log('RESPONSE', response);
        console.log('ERROR', error);
    });
}

function indexExists () {

    return client.indices.exists({
        index: indexName
    }, function (error, response) {
        console.log('RESPONSE', response);
        console.log('ERROR', error);
    });
}

function search () {

    return client.search({
        index: indexName
    }, function (error, response) {
        console.log('RESPONSE', response);
        console.log('ERROR', error);
    });
}

function addDocument (type, payload) {

    return client.index({
        index: indexName,
        type: type,
        body: payload
    }, function (error, response) {
        console.log('RESPONSE', response);
        console.log('ERROR', error);
    });
}

module.exports = {
     initIndex: initIndex,
     deleteIndex: deleteIndex,
     indexExists: indexExists,
     addDocument: addDocument,
     search: search
 };
