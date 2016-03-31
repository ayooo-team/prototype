'use strict';

var elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

const indexName = "package";

function initIndex () {

    return client.indices.create({
        index: indexName
    });
}

function deleteIndex () {

    return client.indices.delete({
        index: indexName
    });
}

function indexExists () {

    return client.indices.exists({
        index: indexName
    });
}

function addDocument (payload) {

    return client.index({
        index: indexName,
        type: "post",
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
     addDocument: addDocument
 };
