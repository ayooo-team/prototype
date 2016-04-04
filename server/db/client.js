'use strict';

var elasticsearch = require('elasticsearch');
var connectionToElasticSearch = process.env.SEARCHBOX_SSL_URL;

const client = new elasticsearch.Client({
    host: connectionToElasticSearch,
    log: 'error'
});

const indexName = "ayooo";

function initIndex () {

    return client.indices.create({
        index: indexName
    });
}

function deleteIndex (indexName) {

    return client.indices.delete({
        index: indexName
    });
}

function indexExists () {

    return client.indices.exists({
        index: indexName
    });
}

function search () {

    return client.search({
        index: indexName
    });
}

function addDocument (type, payload) {

    return client.index({
        index: indexName,
        type: type,
        body: payload,
        suggest: {
            input: payload.item.split(" "),
            output: payload.item
        }
    });
}

module.exports = {
     initIndex: initIndex,
     deleteIndex: deleteIndex,
     indexExists: indexExists,
     addDocument: addDocument,
     search: search
 };
