'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Routes = require('./routes.js');

const port = process.env.PORT || 9000;
const server = new Hapi.Server();

server.connection({ port: port });

server.register(Inert, function (error) {

    if (error) {
        throw error;
    }

    server.route(Routes);

    server.start(function (error) {

        if (error) {
            throw error;
        }
        console.log('Server running at: ', server.info.uri);
    })
})
