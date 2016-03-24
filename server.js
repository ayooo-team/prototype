'use strict';

const Hapi = require('hapi');

const port = process.env.PORT || 9000;
const server = new Hapi.Server();

server.connection({ port: port });

server.start(function(error) {

    if (error) {
        throw error;
    }
    console.log('Server running at: ', server.info.uri);
})
