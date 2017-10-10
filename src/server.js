'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');
const join = require('path').join;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('mydb', ['user']);
const jwt = require('express-jwt');


//imports from other files
import Api from './routes/api.js';
import Router from './routes/router.js';

class Server {

    constructor() {
        this.app = app;
        this.port = process.env.PORT || 3000;
        this.templates();
        this.config();
        this.router();
        this.run();
        this.middleware();
        this.database();

    }

    run() {
        app.listen(this.port, 'localhost', (err) => {
            if (err) {
                console.log("Error while connecting Server");
            } else {
                console.log('Magic happens at http://localhost:' + this.port);
            }
        })
    }

    config() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

    templates() {
        app.set('views', __dirname + '/views');
        app.engine('html', ejs.renderFile);
        app.set('view engine', 'html');
    }

    middleware() {

        app.use(jwt({
            secret: 'Hello World !',
            credentialsRequired: false,
            getToken: function fromHeaderOrQuerystring(req) {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        }));
    }

    database() {

        mongoose.connect('mongodb://localhost/blockchaindb', (err) => {
            if (err) {
                console.log("Error in data base connection");
            } else {
                console.log("Data base succesfully connected");
            }
        });

    }
    router() {
        app.use('/', Router);
        app.use('/', Api);
    }
}

module.exports = new Server();
